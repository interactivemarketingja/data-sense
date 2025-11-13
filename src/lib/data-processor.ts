
'use client'

import type { DataPrepSettings, MissingStrategy, OutlierStrategy } from '@/context/data-prep-context';

type DataRecord = Record<string, any>;

/**
 * Parses a string content into an array of objects.
 * Supports CSV and JSON formats.
 */
function parseData(content: string, fileName: string): DataRecord[] {
  if (fileName.toLowerCase().endsWith('.csv')) {
    const lines = content.split(/\r?\n/).filter(line => line.trim() !== '');
    if (lines.length < 2) return [];

    const header = lines[0].split(',').map(h => h.trim());
    return lines.slice(1).map(line => {
      const values = line.split(',');
      const record: DataRecord = {};
      header.forEach((h, i) => {
        const value = values[i]?.trim();
        // Attempt to convert to number if possible
        if (value !== '' && !isNaN(Number(value))) {
          record[h] = Number(value);
        } else {
          record[h] = value;
        }
      });
      return record;
    });
  } else if (fileName.toLowerCase().endsWith('.json')) {
    return JSON.parse(content);
  }
  throw new Error('Unsupported file type. Please use CSV or JSON.');
}

/**
 * Handles missing values in the dataset based on the chosen strategy.
 */
function handleMissingValues(data: DataRecord[], strategy: MissingStrategy): DataRecord[] {
    if (strategy === 'remove') {
        return data.filter(row => Object.values(row).every(value => value !== null && value !== undefined && value !== ''));
    }

    const columns = Object.keys(data[0] || {});
    const numericColumns = columns.filter(col => data.every(row => typeof row[col] === 'number' || row[col] === null || row[col] === undefined));
    
    const columnStats: Record<string, { mean?: number, median?: number, mode?: any }> = {};

    for (const col of columns) {
        const values = data.map(row => row[col]).filter(v => v !== null && v !== undefined && v !== '');
        if (values.length === 0) continue;

        if (numericColumns.includes(col) && (strategy === 'fill_mean' || strategy === 'fill_median')) {
            const numbers = values.map(Number);
            if (strategy === 'fill_mean') {
                columnStats[col] = { mean: numbers.reduce((a, b) => a + b, 0) / numbers.length };
            } else { // median
                const sorted = [...numbers].sort((a, b) => a - b);
                const mid = Math.floor(sorted.length / 2);
                columnStats[col] = { median: sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2 };
            }
        } else if (strategy === 'fill_mode') {
             const counts = values.reduce((acc, val) => {
                acc[val] = (acc[val] || 0) + 1;
                return acc;
            }, {} as Record<string, number>);
            const mode = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
            columnStats[col] = { mode };
        }
    }
    
    return data.map(row => {
        const newRow = { ...row };
        for (const col in newRow) {
            if (newRow[col] === null || newRow[col] === undefined || newRow[col] === '') {
                if (strategy === 'fill_mean' && columnStats[col]?.mean !== undefined) {
                    newRow[col] = columnStats[col].mean;
                } else if (strategy === 'fill_median' && columnStats[col]?.median !== undefined) {
                    newRow[col] = columnStats[col].median;
                } else if (strategy === 'fill_mode' && columnStats[col]?.mode !== undefined) {
                    newRow[col] = columnStats[col].mode;
                }
            }
        }
        return newRow;
    });
}


/**
 * Removes duplicate rows from the dataset.
 */
function removeDuplicates(data: DataRecord[]): DataRecord[] {
    const seen = new Set<string>();
    return data.filter(row => {
        const rowString = JSON.stringify(row);
        if (seen.has(rowString)) {
            return false;
        } else {
            seen.add(rowString);
            return true;
        }
    });
}

/**
 * Handles outliers in numeric columns.
 */
function handleOutliers(data: DataRecord[], strategy: OutlierStrategy): DataRecord[] {
    const numericColumns = Object.keys(data[0] || {}).filter(col => data.every(row => typeof row[col] === 'number'));
    let filteredData = [...data];

    for (const col of numericColumns) {
        const values = filteredData.map(row => row[col]).sort((a, b) => a - b);
        
        if (strategy === 'iqr') {
            const q1 = values[Math.floor(values.length / 4)];
            const q3 = values[Math.floor(values.length * 3 / 4)];
            const iqr = q3 - q1;
            const lowerBound = q1 - 1.5 * iqr;
            const upperBound = q3 + 1.5 * iqr;
            filteredData = filteredData.filter(row => row[col] >= lowerBound && row[col] <= upperBound);
        } else if (strategy === 'zscore') {
            const mean = values.reduce((acc, val) => acc + val, 0) / values.length;
            const stdDev = Math.sqrt(values.map(val => (val - mean) ** 2).reduce((acc, val) => acc + val, 0) / values.length);
            const zScoreThreshold = 3;
            filteredData = filteredData.filter(row => {
                const z = (row[col] - mean) / stdDev;
                return Math.abs(z) <= zScoreThreshold;
            });
        }
    }
    return filteredData;
}

/**
 * Converts an array of objects back to a CSV string.
 */
function toCsvString(data: DataRecord[]): string {
    if (data.length === 0) return '';
    const header = Object.keys(data[0]);
    const headerString = header.join(',');
    const rows = data.map(row => header.map(h => row[h]).join(','));
    return [headerString, ...rows].join('\n');
}


/**
 * Main function to process data based on settings.
 */
export function processData(
    fileContent: string,
    fileName: string,
    settings: DataPrepSettings
): string {
  let data = parseData(fileContent, fileName);

  if (settings.handleMissing) {
    data = handleMissingValues(data, settings.missingStrategy);
  }
  if (settings.removeDuplicates) {
    data = removeDuplicates(data);
  }
  if (settings.handleOutliers) {
    data = handleOutliers(data, settings.outlierStrategy);
  }

  // Convert back to string (CSV for simplicity, as it's robust for AI)
  return toCsvString(data);
}
