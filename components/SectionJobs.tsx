"use client"

import React, { useState, useEffect } from 'react';
import { Briefcase, Plus, Briefcase as BriefcaseIcon } from 'lucide-react';
import JobMain from './jobs/JobMain';
import { defaultConfig } from '@/lib/configParser';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface SectionJobsProps {
    config: any;
    setConfig: (c: any) => void;
}

const SectionJobs = ({ config, setConfig }: SectionJobsProps) => {
    const [activeJob, setActiveJob] = useState<string | null>(null);
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [createJobInput, setCreateJobInput] = useState('');
    const [alertState, setAlertState] = useState<{ open: boolean; title: string; description: string }>({ open: false, title: '', description: '' });
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [jobToDelete, setJobToDelete] = useState<string | null>(null);

    // Synchroniser activeJob avec les jobs disponibles (après parsing mode brut, ou changement de config)
    useEffect(() => {
        const jobKeys = config.Jobs ? Object.keys(config.Jobs) : [];
        if (jobKeys.length === 0) {
            setActiveJob(null);
            return;
        }
        const currentExists = activeJob && config.Jobs && activeJob in config.Jobs;
        if (!currentExists) {
            setActiveJob(jobKeys[0]);
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

    const handleCreateJobClick = () => {
        setCreateJobInput('');
        setCreateDialogOpen(true);
    };

    const handleCreateJobSubmit = () => {
        const name = createJobInput.trim();
        if (!name) return;
        const safeName = name.replace(/\s+/g, '_').toLowerCase();
        if (config.Jobs?.[safeName]) {
            setCreateDialogOpen(false);
            setAlertState({ open: true, title: 'Métier existant', description: 'Ce métier existe déjà !' });
            return;
        }
        const newJob = JSON.parse(JSON.stringify(defaultConfig.Jobs['police']));
        newJob.label = name.charAt(0).toUpperCase() + name.slice(1);
        setConfig({ ...config, Jobs: { ...config.Jobs, [safeName]: newJob } });
        setActiveJob(safeName);
        setCreateDialogOpen(false);
    };

    const handleDeleteJob = (jobKey: string) => {
        setJobToDelete(jobKey);
        setDeleteConfirmOpen(true);
    };

    const confirmDeleteJob = () => {
        if (!jobToDelete) return;
        const newJobs = { ...config.Jobs };
        delete newJobs[jobToDelete];
        setConfig({ ...config, Jobs: newJobs });
        setActiveJob(Object.keys(newJobs)[0] || null);
        setDeleteConfirmOpen(false);
        setJobToDelete(null);
    };

    return (
        <div className="bg-card rounded-lg shadow-xl overflow-hidden flex flex-col h-[800px] border border-border animate-fade-in-up motion-reduce-none">
            {/* Header Section */}
            <div className="p-4 bg-muted/40 border-b border-border flex justify-between items-center shrink-0">
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <BriefcaseIcon className="text-blue-500" /> Configuration des Métiers
                </h2>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar Liste des métiers */}
                <div className="w-64 bg-muted/40 border-r border-border flex flex-col shrink-0">
                    <div className="p-3 border-b border-border">
                        <Button
                            onClick={handleCreateJobClick}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
                            size="sm"
                        >
                            <Plus size={16} className="mr-2" /> Nouveau Métier
                        </Button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-2 space-y-1">
                        {config.Jobs && Object.keys(config.Jobs).map((jobKey) => (
                            <button
                                key={jobKey}
                                onClick={() => setActiveJob(jobKey)}
                                className={`w-full text-left px-3 py-2 rounded transition-all duration-200 flex flex-col hover:translate-x-0.5 motion-reduce-none ${activeJob === jobKey
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

                {/* Zone d'édition principale — animation au changement de métier */}
                {activeJob && config.Jobs?.[activeJob] ? (
                    <div key={activeJob} className="flex-1 overflow-auto animate-fade-in-up motion-reduce-none">
                        <JobMain
                            activeJobKey={activeJob}
                            job={config.Jobs[activeJob]}
                            onChange={handleJobChange}
                            onDelete={handleDeleteJob}
                        />
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-center bg-muted/20 text-muted-foreground animate-fade-in motion-reduce-none">
                        <div className="text-center">
                            <Briefcase size={48} className="mx-auto mb-4 opacity-20" />
                            <p>Sélectionnez un métier pour le configurer</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Dialog : nouveau métier (prompt remplacé) */}
            <AlertDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
                <AlertDialogContent className="sm:max-w-md">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Nouveau métier</AlertDialogTitle>
                        <AlertDialogDescription>
                            ID du métier (ex: police, taxi…) — pas d&apos;espaces.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="py-2">
                        <Label htmlFor="create-job-id" className="sr-only">ID du métier</Label>
                        <Input
                            id="create-job-id"
                            value={createJobInput}
                            onChange={(e) => setCreateJobInput(e.target.value)}
                            placeholder="police, taxi..."
                            className="font-mono"
                            onKeyDown={(e) => e.key === 'Enter' && handleCreateJobSubmit()}
                        />
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction onClick={handleCreateJobSubmit}>Créer</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Alert : métier existe déjà */}
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

            {/* Confirm : supprimer métier */}
            <AlertDialog open={deleteConfirmOpen} onOpenChange={(open) => { setDeleteConfirmOpen(open); if (!open) setJobToDelete(null); }}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Supprimer le métier ?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Êtes-vous sûr de vouloir supprimer le métier &quot;{jobToDelete}&quot; ?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction variant="destructive" onClick={confirmDeleteJob}>Supprimer</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default SectionJobs;
