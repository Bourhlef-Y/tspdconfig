"use client"

import React, { useState, useEffect } from 'react';
import { Briefcase, Plus, Code, LayoutList, Briefcase as BriefcaseIcon } from 'lucide-react'; // Imports fixes
import JobMain from './jobs/JobMain';
import { defaultConfig, parseJobsBlock } from '@/lib/configParser';
import { exportJobsOnly } from '@/lib/luaExporter';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface SectionJobsProps {
    config: any;
    setConfig: (c: any) => void;
    showRaw?: boolean;
    onToggleRawMode?: (val: boolean) => void;
}

const SectionJobs = ({ config, setConfig, showRaw = false, onToggleRawMode }: SectionJobsProps) => {
    const [activeJob, setActiveJob] = useState<string | null>(null);
    const [rawText, setRawText] = useState(config.JobsRaw || '');

    // Initialiser activeJob si nécessaire
    useEffect(() => {
        if (config.Jobs && Object.keys(config.Jobs).length > 0 && !activeJob) {
            setActiveJob(Object.keys(config.Jobs)[0]);
        }
    }, [config.Jobs]);

    const handleJobChange = (updatedJob: any) => {
        setConfig({
            ...config,
            Jobs: {
                ...config.Jobs,
                [activeJob!]: updatedJob
            }
        });
    };

    const handleCreateJob = () => {
        const name = prompt("ID du métier (ex: police, taxi...) - Pas d'espaces !");
        if (name) {
            const safeName = name.replace(/\s+/g, '_').toLowerCase();
            if (config.Jobs?.[safeName]) {
                alert("Ce métier existe déjà !");
                return;
            }

            // Clone default structure
            const newJob = JSON.parse(JSON.stringify(defaultConfig.Jobs['police']));
            newJob.label = name.charAt(0).toUpperCase() + name.slice(1);

            setConfig({
                ...config,
                Jobs: { ...config.Jobs, [safeName]: newJob }
            });
            setActiveJob(safeName);
        }
    };

    const handleDeleteJob = (jobKey: string) => {
        if (confirm(`Êtes-vous sûr de vouloir supprimer le métier "${jobKey}" ?`)) {
            const newJobs = { ...config.Jobs };
            delete newJobs[jobKey];
            setConfig({ ...config, Jobs: newJobs });
            setActiveJob(Object.keys(newJobs)[0] || null);
        }
    };

    useEffect(() => {
        if (showRaw) {
            // VISUAL -> RAW
            // On génère le Lua à partir de la config visuelle actuelle
            const lua = exportJobsOnly(config.Jobs);
            setRawText(lua);
            setConfig({ ...config, JobsRaw: lua });
        } else {
            // RAW -> VISUAL
            // On tente de parser le Lua brut pour mettre à jour la config visuelle
            // On fait un "best effort"
            try {
                // ConfigParser attend Config.Jobs = { ... } donc on wrap ou on use un helper
                // On utilise notre nouveau helper
                const parsedJobs = parseJobsBlock(rawText);

                // On met à jour si on a trouvé quelque chose, ou même si vide (si user a tout effacé)
                if (parsedJobs) {
                    setConfig({ ...config, Jobs: parsedJobs, JobsRaw: rawText });

                    // Reset active selection if needed
                    const keys = Object.keys(parsedJobs);
                    if (keys.length > 0) {
                        if (!activeJob || !parsedJobs[activeJob]) {
                            setActiveJob(keys[0]);
                        }
                    } else {
                        setActiveJob(null);
                    }
                }
            } catch (e) {
                console.error("Parse error", e);
                alert("Attention: Impossible de lire le Lua brut. Vérifiez la syntaxe.");
                // On laisse passer quand même pour ne pas bloquer l'UI ? Non, le user veut vice-versa.
            }
        }
    }, [showRaw]);

    const handleRawChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        setRawText(val);
        // On update aussi la config globale pour que l'export (bouton header) prenne le raw
        setConfig({ ...config, JobsRaw: val });
    };

    return (
        <div className="bg-card rounded-lg shadow-xl overflow-hidden flex flex-col h-[800px] border border-border">
            {/* Header Section */}
            <div className="p-4 bg-muted/40 border-b border-border flex justify-between items-center shrink-0">
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <BriefcaseIcon className="text-blue-500" /> Configuration des Métiers
                </h2>
            </div>

            {showRaw ? (
                <div className="flex-1 p-4 bg-muted/20 flex flex-col">
                    <div className="bg-blue-500/10 border border-blue-500/20 text-blue-500 p-3 rounded mb-4 text-sm shrink-0">
                        Synchronisation activée : Vos modifications ici seront répercutées dans l'éditeur visuel lorsque vous quitterez ce mode.
                    </div>
                    <textarea
                        value={rawText}
                        onChange={handleRawChange}
                        className="flex-1 bg-card font-mono text-sm text-foreground p-4 rounded border border-border focus:border-ring outline-none resize-none"
                        placeholder="Collez ici le contenu de Config.Jobs = { ... }"
                        spellCheck={false}
                    />
                </div>
            ) : (
                <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar Liste des métiers */}
                    <div className="w-64 bg-muted/40 border-r border-border flex flex-col shrink-0">
                        <div className="p-3 border-b border-border">
                            <Button
                                onClick={handleCreateJob}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                size="sm"
                            >
                                <Plus size={16} className="mr-2" /> Nouveau Métier
                            </Button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-2 space-y-1">
                            {config.Jobs && Object.keys(config.Jobs).map(jobKey => (
                                <button
                                    key={jobKey}
                                    onClick={() => setActiveJob(jobKey)}
                                    className={`w-full text-left px-3 py-2 rounded transition-colors flex flex-col ${activeJob === jobKey
                                        ? 'bg-card border border-primary/50 shadow-sm'
                                        : 'hover:bg-muted/50 border border-transparent'
                                        }`}
                                >
                                    <span className={`font-medium text-sm ${activeJob === jobKey ? 'text-foreground' : 'text-muted-foreground'}`}>
                                        {config.Jobs[jobKey]?.label || jobKey}
                                    </span>
                                    <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wide">
                                        {jobKey}
                                    </span>
                                </button>
                            ))}
                            {(!config.Jobs || Object.keys(config.Jobs).length === 0) && (
                                <div className="p-4 text-center text-muted-foreground text-sm italic">
                                    Aucun métier trouvé.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Zone d'édition principale */}
                    {activeJob && config.Jobs?.[activeJob] ? (
                        <JobMain
                            activeJobKey={activeJob}
                            job={config.Jobs[activeJob]}
                            onChange={handleJobChange}
                            onDelete={handleDeleteJob}
                        />
                    ) : (
                        <div className="flex-1 flex items-center justify-center bg-muted/20 text-muted-foreground">
                            <div className="text-center">
                                <Briefcase size={48} className="mx-auto mb-4 opacity-20" />
                                <p>Sélectionnez un métier pour le configurer</p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SectionJobs;
