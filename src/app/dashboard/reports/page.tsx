import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full">
        <FileText className="w-16 h-16 mb-4 text-muted-foreground" />
        <h1 className="text-2xl font-semibold mb-2">Reports</h1>
        <p className="text-muted-foreground">This page is under construction.</p>
    </div>
  );
}
