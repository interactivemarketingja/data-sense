'use server';
/**
 * @fileOverview An AI flow for analyzing tabular data from a file.
 *
 * - analyzeData - A function that analyzes file content.
 * - AnalyzeDataInput - The input type for the analyzeData function.
 * - AnalyzeDataOutput - The return type for the analyzeData function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AnalyzeDataInputSchema = z.object({
  fileContent: z.string().describe('The full content of the data file (e.g., CSV, JSON).'),
  fileName: z.string().describe('The name of the file.'),
});
export type AnalyzeDataInput = z.infer<typeof AnalyzeDataInputSchema>;

const KeyMetricSchema = z.object({
    title: z.string().describe("Title of the key metric (e.g., 'Total Revenue')."),
    value: z.string().describe("Value of the metric (e.g., '$1.2M')."),
    change: z.string().optional().describe("Change from a previous period (e.g., '+15%')."),
    changeType: z.enum(['increase', 'decrease']).optional().describe("Whether the change is an increase or decrease."),
});

const ChartSchema = z.object({
    type: z.enum(['bar', 'line', 'pie']).describe("The type of chart to render."),
    title: z.string().describe("The title of the chart."),
    description: z.string().describe("A brief description of what the chart shows."),
    data: z.array(z.any()).describe("The data for the chart, as an array of objects."),
    config: z.any().describe("The configuration object for the chart, specifying keys and labels."),
});

const AnalyzeDataOutputSchema = z.object({
  summary: z.string().describe("A comprehensive, multi-paragraph summary of the key insights, patterns, trends, and anomalies found in the data. Provide a narrative that explains the information."),
  keyMetrics: z.array(KeyMetricSchema).describe("An array of 2-4 key metrics derived from the data."),
  charts: z.array(ChartSchema).describe("An array of 2-4 chart objects to visualize the data. Ensure the data format is correct for Recharts (an array of objects). For bar/line charts, data objects should have a key for the x-axis and a key for the y-axis."),
});
export type AnalyzeDataOutput = z.infer<typeof AnalyzeDataOutputSchema>;

export async function analyzeData(input: AnalyzeDataInput): Promise<AnalyzeDataOutput> {
  return analyzeDataFlow(input);
}

const analysisPrompt = ai.definePrompt({
  name: 'dataAnalysisPrompt',
  input: { schema: AnalyzeDataInputSchema },
  output: { schema: AnalyzeDataOutputSchema },
  prompt: `You are a world-class data analyst. Your task is to analyze the provided data and generate a clear, insightful report.

Analyze the data from the file named '{{{fileName}}}'. The content is provided below.
File Content:
\`\`\`
{{{fileContent}}}
\`\`\`

Based on your analysis, provide the following in a JSON object:
1.  **Summary**: A detailed, multi-paragraph summary of the most important findings. Identify key trends, patterns, and any anomalies. Create a compelling narrative that explains what the data means.
2.  **Key Metrics**: Identify 2 to 4 crucial key performance indicators (KPIs). For each metric, provide a title, its value, and optionally, a change from a previous period if inferable.
3.  **Charts**: Suggest 2 to 4 visualizations to represent the data. For each chart, specify the type ('bar', 'line', or 'pie'), a title, a description, the data formatted as a JSON array of objects for Recharts, and a config object. The 'config' should map data keys to labels and colors (e.g., \`{ "desktop": { "label": "Desktop Revenue", "color": "hsl(var(--primary))" } }\`). Make sure the data is structured correctly for the specified chart type. The data should not exceed 10 records per chart to keep it concise.
`,
});

const analyzeDataFlow = ai.defineFlow(
  {
    name: 'analyzeDataFlow',
    inputSchema: AnalyzeDataInputSchema,
    outputSchema: AnalyzeDataOutputSchema,
  },
  async (input) => {
    const { output } = await analysisPrompt(input);
    if (!output) {
      throw new Error('Failed to get analysis from the AI model.');
    }
    return output;
  }
);
