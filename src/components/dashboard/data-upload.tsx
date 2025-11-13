'use client'

import { useState, type DragEvent } from 'react'
import { UploadCloud, FileJson, FileUp, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

type DataUploadProps = {
  onAnalyze: (file: File) => void;
  isLoading: boolean;
  error: string | null;
  singleAction?: boolean; // New prop: if true, upload triggers on file selection
};

export default function DataUpload({ onAnalyze, isLoading, error, singleAction = false }: DataUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile) {
      setFile(selectedFile);
      if (singleAction) {
          onAnalyze(selectedFile);
      }
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = () => {
    if (file) {
      onAnalyze(file);
    }
  };

  if (singleAction && file) {
      return (
         <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border">
            <div className="flex items-center gap-3 overflow-hidden">
              <FileJson className="w-6 h-6 text-primary flex-shrink-0" />
              <div className="overflow-hidden">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setFile(null)}>
              Change File
            </Button>
          </div>
      )
  }

  return (
    <Card className="w-full max-w-3xl mx-auto animate-in fade-in-50">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Upload Your Data</CardTitle>
        <CardDescription>
          Upload a CSV, Excel, or JSON file to start generating insights.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && !singleAction && (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Analysis Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
        <div
          className={`relative flex flex-col items-center justify-center w-full p-12 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
            isDragging ? 'border-primary bg-accent/10' : 'border-border hover:border-primary/50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <UploadCloud className="w-12 h-12 text-muted-foreground mb-4 mx-auto" />
            <p className="text-muted-foreground">
              <label htmlFor="file-upload" className="font-semibold text-primary cursor-pointer hover:underline">
                Click to upload
              </label>{' '}
              or drag and drop
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              CSV, XLS, or JSON (max. 50MB)
            </p>
          </div>
          <Input 
            id="file-upload" 
            type="file" 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .json"
            onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)}
            disabled={isLoading}
          />
        </div>
        
        {file && !singleAction && (
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border">
            <div className="flex items-center gap-3 overflow-hidden">
              <FileJson className="w-6 h-6 text-primary flex-shrink-0" />
              <div className="overflow-hidden">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setFile(null)}>
              Remove
            </Button>
          </div>
        )}

        {!singleAction && (
          <Button
            onClick={handleSubmit}
            disabled={!file || isLoading}
            className="w-full"
            size="lg"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <FileUp className="mr-2 h-4 w-4" />
            )}
            {isLoading ? 'Analyzing...' : 'Analyze Data'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
