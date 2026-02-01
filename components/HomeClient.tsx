"use client"

import { useState, useEffect, useRef } from 'react';
import SectionJobs from '@/components/SectionJobs';
import { parseConfigLua } from '@/lib/configParser';
import { exportToLua } from '@/lib/luaExporter';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { defaultConfig } from '@/lib/configParser';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Code, LayoutList, Download, ExternalLink, ChevronDown } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import SectionGeneral from '@/components/SectionGeneral';

const RAW_SYNC_DEBOUNCE_MS = 600;
const STORAGE_KEY = 'tspd-config-editor-state';
const SAVE_DEBOUNCE_MS = 500;

function loadStateFromStorage(): { config: any; showRaw: boolean; rawText: string } | null {
    if (typeof window === 'undefined') return null;
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const data = JSON.parse(raw);
        if (!data || typeof data !== 'object' || !data.config) return null;
        return {
            config: data.config,
            showRaw: !!data.showRaw,
            rawText: typeof data.rawText === 'string' ? data.rawText : '',
        };
    } catch {
        return null;
    }
}

function saveStateToStorage(config: any, showRaw: boolean, rawText: string) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ config, showRaw, rawText }));
    } catch {
        // quota exceeded or disabled
    }
}

export default function HomeClient() {
    const [config, setConfig] = useState(defaultConfig);
    const [activeTab, setActiveTab] = useState<'general' | 'jobs'>('general');
    const [showRaw, setShowRaw] = useState(false);
    const [rawText, setRawText] = useState('');
    const rawSyncTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [alertState, setAlertState] = useState<{ open: boolean; title: string; description: string }>({
        open: false,
        title: '',
        description: '',
    });

    // Au montage : restaurer la config enregistrée en local
    useEffect(() => {
        const saved = loadStateFromStorage();
        if (saved) {
            setConfig(saved.config);
            setShowRaw(saved.showRaw);
            setRawText(saved.rawText);
        }
    }, []);

    // Sauvegarder automatiquement en local (debounce)
    useEffect(() => {
        saveTimeoutRef.current = setTimeout(() => {
            saveStateToStorage(config, showRaw, rawText);
            saveTimeoutRef.current = null;
        }, SAVE_DEBOUNCE_MS);
        return () => {
            if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
        };
    }, [config, showRaw, rawText]);

    // Sync mode brut ← éditeur visuel : quand on modifie en visuel, le texte brut reste à jour
    useEffect(() => {
        if (!showRaw) {
            setRawText(exportToLua(config));
        }
    }, [config, showRaw]);

    // Sync éditeur visuel ← mode brut : quand on modifie le Lua brut, le config est mis à jour (debounce)
    useEffect(() => {
        if (!showRaw || !rawText.trim()) return;
        if (rawSyncTimeoutRef.current) clearTimeout(rawSyncTimeoutRef.current);
        rawSyncTimeoutRef.current = setTimeout(() => {
            try {
                const parsed = parseConfigLua(rawText);
                if (parsed) setConfig(parsed);
            } catch {
                // Lua invalide : on ne touche pas au config
            }
            rawSyncTimeoutRef.current = null;
        }, RAW_SYNC_DEBOUNCE_MS);
        return () => {
            if (rawSyncTimeoutRef.current) clearTimeout(rawSyncTimeoutRef.current);
        };
    }, [rawText, showRaw]);

    const toggleRawMode = (val: boolean) => {
        if (val) {
            setRawText(exportToLua(config));
        } else {
            try {
                const parsed = parseConfigLua(rawText);
                if (parsed) setConfig(parsed);
            } catch (e) {
                console.error("Parse error", e);
                setAlertState({
                    open: true,
                    title: 'Lua invalide',
                    description: 'Impossible de lire le Lua brut. Vérifiez la syntaxe.',
                });
                return;
            }
        }
        setShowRaw(val);
    };

    const handleRawChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setRawText(e.target.value);
    };

    const handleExport = () => {
        const lua = showRaw ? rawText : exportToLua(config);
        const blob = new Blob([lua], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'config.lua';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        try {
            navigator.clipboard.writeText(lua);
        } catch {
            // copie presse-papier non disponible (contexte sécurisé, etc.)
        }
        setAlertState({
            open: true,
            title: 'Téléchargement terminé',
            description: 'Fichier config.lua téléchargé (et copié dans le presse-papier).',
        });
    };

    const handleOpenInNewTab = () => {
        const lua = showRaw ? rawText : exportToLua(config);
        const blob = new Blob([lua], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank', 'noopener,noreferrer');
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    };

    return (
        <main className="min-h-screen bg-background p-8 text-foreground transition-colors duration-300">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">TSPD Config.lua Editor</h1>
                        <p className="text-muted-foreground">Éditeur de configuration complet</p>
                        <p className="text-xs text-muted-foreground/80 mt-1">Configuration enregistrée automatiquement en local (conservée à la fermeture)</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 bg-card p-2 rounded-lg border border-border shadow-sm">
                            <Label htmlFor="mode-switch" className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                                {showRaw ? <Code size={14} className="text-blue-400" /> : <LayoutList size={14} className="text-blue-400" />}
                                {showRaw ? 'Mode Brut' : 'Éditeur Visuel'}
                            </Label>
                            <Switch
                                id="mode-switch"
                                checked={showRaw}
                                onCheckedChange={toggleRawMode}
                            />
                        </div>
                        <ModeToggle />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="default" className="shadow-lg hover:shadow-xl transition-all gap-2">
                                    Exporter config.lua
                                    <ChevronDown size={18} className="opacity-80" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={handleExport}>
                                    <Download size={16} className="mr-2" />
                                    Télécharger
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleOpenInNewTab}>
                                    <ExternalLink size={16} className="mr-2" />
                                    Ouvrir dans un nouvel onglet
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {showRaw ? (
                    <div className="flex-1 p-6 bg-card rounded-lg shadow-xl border border-border min-h-[600px] flex flex-col">
                        <div className="bg-blue-500/10 border border-blue-500/20 text-blue-500 p-3 rounded mb-4 text-sm shrink-0">
                            <strong>Mode Édition Complète :</strong> Vous modifiez ici l'intégralité du fichier <code>config.lua</code>.
                            Les changements seront appliqués à l'interface visuelle lorsque vous désactiverez ce mode.
                        </div>
                        <textarea
                            value={rawText}
                            onChange={handleRawChange}
                            className="flex-1 bg-muted/30 font-mono text-sm text-foreground p-4 rounded border border-border focus:border-ring outline-none resize-none leading-relaxed"
                            placeholder="Config = {} ..."
                            spellCheck={false}
                        />
                    </div>
                ) : (
                    <>
                        {/* Tabs Navigation (Visible only in Visual Mode) */}
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
                            {activeTab === 'general' && (
                                <SectionGeneral config={config} setConfig={setConfig} />
                            )}
                            {activeTab === 'jobs' && (
                                <SectionJobs config={config} setConfig={setConfig} />
                            )}
                        </div>
                    </>
                )}
            </div>

            <AlertDialog open={alertState.open} onOpenChange={(open) => setAlertState((s) => ({ ...s, open }))}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{alertState.title}</AlertDialogTitle>
                        <AlertDialogDescription>{alertState.description}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction>OK</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </main>
    );
}
