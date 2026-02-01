"use client"

import React from 'react';
import { Truck, Plus, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const JobVehicles = ({ job, onChange }: { job: any, onChange: (j: any) => void }) => {
    const vehicles = job.vehicles || {};

    const handleAddCategory = () => {
        const name = prompt("Nom de la catégorie (ex: [PS] Police Secours)");
        if (name && !vehicles[name]) {
            onChange({ ...job, vehicles: { ...vehicles, [name]: [] } });
        }
    };

    const handleRemoveCategory = (cat: string) => {
        if (confirm(`Supprimer la catégorie "${cat}" et ses véhicules ?`)) {
            const newVehicles = { ...vehicles };
            delete newVehicles[cat];
            onChange({ ...job, vehicles: newVehicles });
        }
    };

    const handleAddVehicle = (cat: string) => {
        const currentList = vehicles[cat] || [];
        const newVehicles = { ...vehicles, [cat]: [...currentList, { label: 'Nouveau véhicule', model: '' }] };
        onChange({ ...job, vehicles: newVehicles });
    };

    const handleRemoveVehicle = (cat: string, index: number) => {
        const currentList = vehicles[cat] || [];
        const newVehicles = { ...vehicles, [cat]: currentList.filter((_: any, i: number) => i !== index) };
        onChange({ ...job, vehicles: newVehicles });
    };

    const updateVehicle = (cat: string, index: number, field: string, value: string) => {
        const currentList = vehicles[cat] || [];
        const newList = [...currentList];
        newList[index] = { ...newList[index], [field]: value };
        onChange({ ...job, vehicles: { ...vehicles, [cat]: newList } });
    };

    return (
        <Card className="border-border mt-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Truck size={20} className="text-blue-500" /> Véhicules
                </CardTitle>
                <Button
                    onClick={handleAddCategory}
                    size="sm"
                    className="h-8"
                >
                    <Plus size={16} className="mr-2" /> Nouvelle Catégorie
                </Button>
            </CardHeader>

            <CardContent className="space-y-6">
                {Object.keys(vehicles).length === 0 && (
                    <div className="text-muted-foreground italic text-center py-8 border border-dashed border-border rounded-lg">
                        Aucune catégorie de véhicule définie.
                    </div>
                )}

                {Object.entries(vehicles).map(([category, list]: [string, any]) => (
                    <div key={category} className="bg-muted/40 rounded-lg p-4 border border-border">
                        <div className="flex justify-between items-center mb-4 pb-2 border-b border-border">
                            <h4 className="font-bold text-foreground">{category}</h4>
                            <div className="flex gap-2">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => handleAddVehicle(category)}
                                    className="h-7 text-xs"
                                >
                                    <Plus size={14} className="mr-1" /> Véhicule
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleRemoveCategory(category)}
                                    className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                                    title="Supprimer catégorie"
                                >
                                    <Trash2 size={16} />
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {list.map((veh: any, idx: number) => (
                                <div key={idx} className="flex gap-3 items-center">
                                    <Input
                                        type="text"
                                        value={veh.label}
                                        onChange={(e) => updateVehicle(category, idx, 'label', e.target.value)}
                                        placeholder="Nom affiché (ex: Peugeot 308)"
                                        className="flex-1"
                                    />
                                    <Input
                                        type="text"
                                        value={veh.model}
                                        onChange={(e) => updateVehicle(category, idx, 'model', e.target.value)}
                                        placeholder="Modèle (spawn code)"
                                        className="w-1/3 font-mono"
                                    />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleRemoveVehicle(category, idx)}
                                        className="text-destructive hover:text-destructive hover:bg-destructive/10 h-9 w-9"
                                    >
                                        <Trash2 size={16} />
                                    </Button>
                                </div>
                            ))}
                            {list.length === 0 && <p className="text-xs text-muted-foreground italic">Aucun véhicule dans cette catégorie.</p>}
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

export default JobVehicles;
