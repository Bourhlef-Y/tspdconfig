"use client"

import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import JobBasicInfo from './JobBasicInfo';
import JobLocations from './JobLocations';
import JobGarage from './JobGarage';
import JobPeds from './JobPeds';
import JobVehicles from './JobVehicles';
import JobWeaponPacks from './JobWeaponPacks';
import JobUniforms from './JobUniforms';
import JobGradeImages from './JobGradeImages';
import { Button } from '@/components/ui/button';

interface JobMainProps {
    activeJobKey: string;
    job: any;
    onChange: (j: any) => void;
    onDelete: (k: string) => void;
    onRename?: (k: string) => void;
}

const JobMain = ({ activeJobKey, job, onChange, onDelete }: JobMainProps) => {
    const [activeTab, setActiveTab] = useState('general');

    if (!job) return <div className="p-8 text-center text-muted-foreground">Sélectionnez ou créez un métier pour commencer.</div>;

    const tabs = [
        { id: 'general', label: 'Général' },
        { id: 'locations', label: 'Localisations' },
        { id: 'garage', label: 'Garage' },
        { id: 'peds', label: 'Peds' },
        { id: 'uniforms', label: 'Uniformes' },
        { id: 'gradeImages', label: 'Images grades' },
        { id: 'weaponPacks', label: 'Armurerie' },
        { id: 'vehicles', label: 'Véhicules' },
    ];

    return (
        <div className="flex-1 bg-card border-l border-border flex flex-col h-full overflow-hidden">
            {/* Header du métier actif */}
            <div className="p-4 border-b border-border bg-card flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full shadow-sm ring-2 ring-border" style={{ backgroundColor: job.color || '#333' }}></div>
                    <h2 className="text-xl font-bold text-foreground">{job.label || activeJobKey}</h2>
                    <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">Kode: {activeJobKey}</span>
                </div>

                <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(activeJobKey)}
                    className="flex items-center gap-2"
                >
                    <Trash2 size={16} /> Supprimer ce métier
                </Button>
            </div>

            {/* Navigation des onglets */}
            <div className="flex border-b border-border bg-card overflow-x-auto">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === tab.id
                                ? 'border-primary text-primary bg-primary/5'
                                : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Contenu */}
            <div className="flex-1 overflow-y-auto p-6 bg-muted/20">
                {activeTab === 'general' && <JobBasicInfo job={job} onChange={onChange} />}
                {activeTab === 'locations' && <JobLocations job={job} onChange={onChange} />}
                {activeTab === 'garage' && <JobGarage job={job} onChange={onChange} />}
                {activeTab === 'peds' && <JobPeds job={job} onChange={onChange} />}
                {activeTab === 'uniforms' && <JobUniforms job={job} onChange={onChange} />}
                {activeTab === 'gradeImages' && <JobGradeImages job={job} onChange={onChange} />}
                {activeTab === 'weaponPacks' && <JobWeaponPacks job={job} onChange={onChange} />}
                {activeTab === 'vehicles' && <JobVehicles job={job} onChange={onChange} />}
            </div>
        </div>
    );
};

export default JobMain;
