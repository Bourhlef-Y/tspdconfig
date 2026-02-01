"use client"

import React from 'react';
import { Users } from 'lucide-react';
import VectorInput from './VectorInput';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const pedLocations = [
    { key: 'accueil', label: 'Accueil' },
    { key: 'vestiaire', label: 'Vestiaire' },
    { key: 'armurerie', label: 'Armurerie' },
    { key: 'garage', label: 'Garage' },
    { key: 'recruiterPoint', label: 'Recrutement' },
    { key: 'bossPoint', label: 'Boss' },
    { key: 'heliPoint', label: 'Hélicoptère' },
    { key: 'boatPoint', label: 'Bateau' },
];

const JobPeds = ({ job, onChange }: { job: any, onChange: (j: any) => void }) => {
    const peds = job.peds || {};

    const updatePed = (key: string, field: string, value: any) => {
        const currentPed = peds[key] || { enabled: false, model: '', coords: { x: 0, y: 0, z: 0, w: 0 } };
        const newPeds = { ...peds, [key]: { ...currentPed, [field]: value } };
        onChange({ ...job, peds: newPeds });
    };

    const updatePedCoords = (key: string, value: any) => {
        updatePed(key, 'coords', value);
    };

    return (
        <Card className="border-border mt-4">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Users size={20} className="text-blue-500" /> Peds (NPCs)
                </CardTitle>
                <p className="text-muted-foreground text-sm">
                    Activez les Peds pour chaque point d'interaction si nécessaire.
                </p>
            </CardHeader>

            <CardContent className="grid grid-cols-1 gap-4">
                {pedLocations.map(({ key, label }) => {
                    const ped = peds[key] || { enabled: false, model: '', coords: { x: 0, y: 0, z: 0, w: 0 } };
                    const id = `ped-${key}`;

                    return (
                        <div key={key} className={`p-4 rounded-lg border transition-all ${ped.enabled ? 'bg-muted/30 border-primary/50 shadow-sm' : 'bg-muted/10 border-border'}`}>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-4">
                                    <Switch
                                        id={id}
                                        checked={ped.enabled}
                                        onCheckedChange={(checked) => updatePed(key, 'enabled', checked)}
                                    />
                                    <Label htmlFor={id} className={`font-medium text-base cursor-pointer ${ped.enabled ? 'text-foreground' : 'text-muted-foreground'}`}>
                                        {label}
                                    </Label>
                                </div>

                                <div className={`w-1/2 transition-opacity duration-200 ${ped.enabled ? 'opacity-100' : 'opacity-40 pointer-events-none grayscale'}`}>
                                    <Input
                                        type="text"
                                        value={ped.model}
                                        onChange={(e) => updatePed(key, 'model', e.target.value)}
                                        placeholder="Modèle (ex: s_m_y_cop_01)"
                                        className="bg-background"
                                        disabled={!ped.enabled}
                                    />
                                </div>
                            </div>

                            <div className={`pl-14 border-l-2 border-border ml-3 transition-opacity duration-200 ${ped.enabled ? 'opacity-100' : 'opacity-40 pointer-events-none grayscale'}`}>
                                <VectorInput
                                    label={`Coordonnées ${label}`}
                                    value={ped.coords}
                                    onChange={(v) => updatePedCoords(key, v)}
                                    hasHeading={true}
                                />
                            </div>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
};

export default JobPeds;
