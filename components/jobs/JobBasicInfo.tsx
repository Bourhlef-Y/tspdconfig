"use client"

import React from 'react';
import { Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

const JobBasicInfo = ({ job, onChange }: { job: any, onChange: (j: any) => void }) => {
    const handleChange = (field: string, value: any) => {
        onChange({ ...job, [field]: value });
    };

    return (
        <Card className="border-border bg-card">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Info size={20} className="text-blue-500" /> Informations de base
                </CardTitle>
            </CardHeader>

            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="job-label">Nom du métier (Label)</Label>
                    <Input
                        id="job-label"
                        type="text"
                        value={job.label || ''}
                        onChange={(e) => handleChange('label', e.target.value)}
                        placeholder="Ex: Police Nationale"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="job-color">Couleur (Hex)</Label>
                    <div className="flex gap-2">
                        <Input
                            id="job-color"
                            type="color"
                            value={job.color || '#000000'}
                            onChange={(e) => handleChange('color', e.target.value)}
                            className="h-10 w-14 p-1 cursor-pointer"
                        />
                        <Input
                            type="text"
                            value={job.color || ''}
                            onChange={(e) => handleChange('color', e.target.value)}
                            placeholder="#RRGGBB"
                            className="flex-1"
                        />
                    </div>
                </div>

                <div className="md:col-span-2">
                    <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg border border-border">
                        <Switch
                            id="whitelisted"
                            checked={job.whitelisted === true}
                            onCheckedChange={(checked) => handleChange('whitelisted', checked)}
                        />
                        <div className="space-y-1">
                            <Label htmlFor="whitelisted" className="text-base cursor-pointer">Métier Whitelisté</Label>
                            <p className="text-xs text-muted-foreground">Si activé, le recrutement se fait uniquement via dossier/concours (nécessite setjob). Si désactivé, pas de Gestion RH (recruteur/patron).</p>
                        </div>
                    </div>
                </div>

                <div className={`space-y-4 transition-opacity ${!job.whitelisted ? 'opacity-50 pointer-events-none' : ''}`}>
                    <p className="text-xs text-muted-foreground italic">Gestion RH — actif uniquement si métier whitelisté</p>
                    <div className="space-y-2">
                        <Label htmlFor="recruiter-grade">Grade Recruteur (ID)</Label>
                        <Input
                            id="recruiter-grade"
                            type="number"
                            value={job.recruiterGrade ?? 0}
                            onChange={(e) => handleChange('recruiterGrade', parseInt(e.target.value) || 0)}
                            disabled={!job.whitelisted}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="boss-grade">Grade Patron (ID)</Label>
                        <Input
                            id="boss-grade"
                            type="number"
                            value={job.bossGrade ?? 0}
                            onChange={(e) => handleChange('bossGrade', parseInt(e.target.value) || 0)}
                            disabled={!job.whitelisted}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default JobBasicInfo;
