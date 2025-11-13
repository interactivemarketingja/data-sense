import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full">
        <Settings className="w-16 h-16 mb-4 text-muted-foreground" />
        <h1 className="text-2xl font-semibold mb-2">Settings</h1>
        <p className="text-muted-foreground">This page is under construction.</p>
    </div>
  );
}
