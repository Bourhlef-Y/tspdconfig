"use client"

import React from 'react';
import { MapPin } from 'lucide-react';
import VectorInput from './VectorInput';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const JobLocations = ({ job, onChange }: { job: any, onChange: (j: any) => void }) => {
    const handleChange = (field: string, value: any) => {
        onChange({ ...job, [field]: value });
    };

    return (
        <Card className="border-border mt-4">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <MapPin size={20} className="text-blue-500" /> Localisations Principales
                </CardTitle>
            </CardHeader>

            <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <h4 className="text-sm font-bold text-muted-foreground mb-4 uppercase tracking-wider border-b border-border pb-1">Gestion RH</h4>
                    <VectorInput
                        label="Point Recrutement"
                        value={job.recruiterPoint}
                        onChange={(v) => handleChange('recruiterPoint', v)}
                    />
                    <VectorInput
                        label="Point Patron (Boss)"
                        value={job.bossPoint}
                        onChange={(v) => handleChange('bossPoint', v)}
                    />
                </div>

                <div>
                    <h4 className="text-sm font-bold text-muted-foreground mb-4 uppercase tracking-wider border-b border-border pb-1">Points Métier</h4>
                    <VectorInput
                        label="Accueil"
                        value={job.accueil}
                        onChange={(v) => handleChange('accueil', v)}
                    />
                    <VectorInput
                        label="Vestiaire"
                        value={job.vestiaire}
                        onChange={(v) => handleChange('vestiaire', v)}
                    />
                    <VectorInput
                        label="Armurerie"
                        value={job.armurerie}
                        onChange={(v) => handleChange('armurerie', v)}
                    />
                </div>

                <div>
                    <h4 className="text-sm font-bold text-muted-foreground mb-4 uppercase tracking-wider border-b border-border pb-1">Optionnel</h4>
                    <VectorInput
                        label="Point Hélicoptère (Laissez 0 pour désactiver)"
                        value={job.heliPoint}
                        onChange={(v) => handleChange('heliPoint', v)}
                    />
                    <VectorInput
                        label="Point Bateau (Laissez 0 pour désactiver)"
                        value={job.boatPoint}
                        onChange={(v) => handleChange('boatPoint', v)}
                    />
                </div>
            </CardContent>
        </Card>
    );
};

export default JobLocations;
