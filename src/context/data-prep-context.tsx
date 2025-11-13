'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type MissingStrategy = 'remove' | 'fill_mean' | 'fill_median' | 'fill_mode';
export type OutlierStrategy = 'iqr' | 'zscore';

// Define the shape of the settings
export interface DataPrepSettings {
  handleMissing: boolean;
  missingStrategy: MissingStrategy;
  removeDuplicates: boolean;
  handleOutliers: boolean;
  outlierStrategy: OutlierStrategy;
}

// Define the shape of the context
interface DataPrepContextType {
  settings: DataPrepSettings;
  setSettings: (settings: Partial<DataPrepSettings>) => void;
}

const defaultSettings: DataPrepSettings = {
    handleMissing: true,
    missingStrategy: 'remove',
    removeDuplicates: true,
    handleOutliers: false,
    outlierStrategy: 'iqr',
};

// Create the context
const DataPrepContext = createContext<DataPrepContextType | undefined>(undefined);

// Create a custom hook to use the data prep context
export function useDataPrep() {
  const context = useContext(DataPrepContext);
  if (!context) {
    throw new Error('useDataPrep must be used within a DataPrepProvider');
  }
  return context;
}

// Create the provider component
export function DataPrepProvider({ children }: { children: ReactNode }) {
  const [settings, setSettingsState] = useState<DataPrepSettings>(() => {
    if (typeof window === 'undefined') {
      return defaultSettings;
    }
    try {
      const item = window.localStorage.getItem('dataPrepSettings');
      return item ? JSON.parse(item) : defaultSettings;
    } catch (error) {
      console.error('Failed to load data prep settings from localStorage', error);
      return defaultSettings;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('dataPrepSettings', JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save data prep settings to localStorage', error);
    }
  }, [settings]);
  
  const setSettings = (newSettings: Partial<DataPrepSettings>) => {
    setSettingsState(prevSettings => ({ ...prevSettings, ...newSettings }));
  };

  const value = {
    settings,
    setSettings,
  };

  return (
    <DataPrepContext.Provider value={value}>
      {children}
    </DataPrepContext.Provider>
  );
}