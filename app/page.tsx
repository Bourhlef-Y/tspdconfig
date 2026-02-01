"use client"

import { useState } from 'react';
import SectionJobs from '@/components/SectionJobs';
import { parseConfigLua } from '@/lib/configParser';
import { exportToLua } from '@/lib/luaExporter';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { defaultConfig } from '@/lib/configParser';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { LayoutList } from 'lucide-react';

import SectionGeneral from '@/components/SectionGeneral';

export default function Home() {
    const [config, setConfig] = useState(defaultConfig);
    const [activeTab, setActiveTab] = useState<'general' | 'jobs'>('general');
    const [showRaw, setShowRaw] = useState(false);

    const handleImport = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        if (val) {
            try {
                const parsed = parseConfigLua(val);
                setConfig(parsed);
            } catch (e) {
                console.error(e);
                alert("Erreur de parsing");
            }
        }
    };

    const handleExport = () => {
        const lua = exportToLua(config);
        console.log(lua);
        alert("Config exportée dans la console (F12) et copiée dans le presse-papier !");
        navigator.clipboard.writeText(lua);
    };

    const toggleRawMode = (val: boolean) => {
        setShowRaw(val);
    };

    return (
        <main className="min-h-screen bg-background p-8 text-foreground">
            <div className="max-w-7xl mx-auto flex flex-col space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between gap-4 mb-4">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">TSPD Config Editor</h1>
                        <p className="text-muted-foreground">Éditeur de configuration complet</p>
                    </div>
                    <div className="flex items-center gap-3 bg-card p-2 rounded-lg border border-border ml-auto">
                        <Label htmlFor="mode-switch" className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                            <LayoutList size={14} className="text-blue-400" />
                            Éditeur Visuel
                        </Label>
                        <Switch
                            id="mode-switch"
                            checked={showRaw}
                            onCheckedChange={toggleRawMode}
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <ModeToggle />
                        <Button onClick={handleExport} variant="default" className="shadow-lg hover:shadow-xl transition-all">
                            Exporter config.lua
                        </Button>
                    </div>
                </div>

                {/* Tabs Navigation */}
                <div className="flex rounded-lg bg-muted p-1 w-fit">
                    <button
                        onClick={() => setActiveTab('general')}
                        className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'general'
                            ? 'bg-background text-foreground shadow-sm'
                            : 'text-muted-foreground hover:bg-background/50 hover:text-foreground'
                            }`}
                    >
                        Général & Admin
                    </button>
                    <button
                        onClick={() => setActiveTab('jobs')}
                        className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'jobs'
                            ? 'bg-background text-foreground shadow-sm'
                            : 'text-muted-foreground hover:bg-background/50 hover:text-foreground'
                            }`}
                    >
                        Métiers (Jobs)
                    </button>
                </div>

                {/* Main Content Area */}
                <div className="transition-all duration-300 ease-in-out">
                    {activeTab === 'general' ? (
                        <SectionGeneral config={config} setConfig={setConfig} />
                    ) : (
                        <SectionJobs config={config} setConfig={setConfig} />
                    )}
                </div>

                <div className="mt-8 p-4 bg-muted/30 rounded border border-border">
                    <h3 className="font-bold mb-2 text-sm text-muted-foreground uppercase tracking-wider">Debug Import</h3>
                    <textarea
                        className="w-full h-24 bg-background p-3 border border-border rounded font-mono text-xs text-muted-foreground focus:text-foreground transition-colors"
                        placeholder="Collez un config.lua ici pour tester le parser..."
                        onChange={handleImport}
                    />
                </div>
            </div>
        </main>
    );
}
