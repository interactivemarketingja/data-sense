'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the data
export interface AppData {
  fileName: string | null;
  fileContent: string | null;
  file: File | null;
}

// Define the shape of the context
interface DataContextType {
  data: AppData;
  setData: (data: AppData) => void;
}

const defaultData: AppData = {
    fileName: null,
    fileContent: null,
    file: null,
};

// Create the context
const DataContext = createContext<DataContextType | undefined>(undefined);

// Create a custom hook to use the data context
export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

// Create the provider component
export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData>(defaultData);

  const value = {
    data,
    setData,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}
