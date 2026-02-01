"use client"

import React from 'react';
import { Car, Plus, Trash2 } from 'lucide-react';
import VectorInput from './VectorInput';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

type SpawnPoint = { x: number; y: number; z: number; w?: number };

interface SpawnListProps {
    title: string;
    points: SpawnPoint[];
    onAdd: () => void;
    onUpdate: (index: number, value: SpawnPoint) => void;
    onRemove: (index: number) => void;
}

const JobGarage = ({ job, onChange }: { job: any, onChange: (j: any) => void }) => {
    const garage = job.garage || {
        spawn: { x: 0, y: 0, z: 0, w: 0 },
        spawnPoints: [],
        deletePoint: { x: 0, y: 0, z: 0 },
        spawnCheckRadius: 3.0,
        heliSpawnPoints: [],
        boatSpawnPoints: []
    };

    const updateGarage = (field: string, value: any) => {
        onChange({ ...job, garage: { ...garage, [field]: value } });
    };

    // Generic handler for lists of spawn points
    const addSpawnPoint = (propName: string) => {
        const currentList = garage[propName] || [];
        updateGarage(propName, [...currentList, { x: 0, y: 0, z: 0, w: 0 }]);
    };

    const removeSpawnPoint = (propName: string, index: number) => {
        const currentList = garage[propName] || [];
        updateGarage(propName, currentList.filter((_: any, i: number) => i !== index));
    };

    const updateSpawnPoint = (propName: string, index: number, val: any) => {
        const currentList = garage[propName] || [];
        const newList = [...currentList];
        newList[index] = val;
        updateGarage(propName, newList);
    };

    return (
        <Card className="border-border mt-4">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Car size={20} className="text-blue-500" /> Garage
                </CardTitle>
            </CardHeader>

            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Paramètres de base */}
                <div className="space-y-6">
                    <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider border-b border-border pb-1">Points Principaux</h4>
                    <VectorInput
                        label="Point Interaction (Menu Garage)"
                        value={garage.spawn}
                        onChange={(v) => updateGarage('spawn', v)}
                        hasHeading={true}
                    />
                    <VectorInput
                        label="Point de Rentrée (Delete)"
                        value={garage.deletePoint}
                        onChange={(v) => updateGarage('deletePoint', v)}
                    />
                    <div className="space-y-2">
                        <Label>Rayon de vérification (Spawn Check)</Label>
                        <Input
                            type="number"
                            step="0.1"
                            value={garage.spawnCheckRadius || 3.0}
                            onChange={(e) => updateGarage('spawnCheckRadius', parseFloat(e.target.value))}
                        />
                    </div>
                </div>

                {/* Listes de Spawn Points */}
                <div className="space-y-8">
                    <SpawnList
                        title="Points de Sortie (Véhicules)"
                        points={garage.spawnPoints}
                        onAdd={() => addSpawnPoint('spawnPoints')}
                        onUpdate={(index, value) => updateSpawnPoint('spawnPoints', index, value)}
                        onRemove={(index) => removeSpawnPoint('spawnPoints', index)}
                    />
                    <SpawnList
                        title="Points de Sortie (Hélicoptères)"
                        points={garage.heliSpawnPoints}
                        onAdd={() => addSpawnPoint('heliSpawnPoints')}
                        onUpdate={(index, value) => updateSpawnPoint('heliSpawnPoints', index, value)}
                        onRemove={(index) => removeSpawnPoint('heliSpawnPoints', index)}
                    />
                    <SpawnList
                        title="Points de Sortie (Bateaux)"
                        points={garage.boatSpawnPoints}
                        onAdd={() => addSpawnPoint('boatSpawnPoints')}
                        onUpdate={(index, value) => updateSpawnPoint('boatSpawnPoints', index, value)}
                        onRemove={(index) => removeSpawnPoint('boatSpawnPoints', index)}
                    />
                </div>
            </CardContent>
        </Card>
    );
};

const SpawnList = ({ title, points, onAdd, onUpdate, onRemove }: SpawnListProps) => {
    return (
        <div>
            <div className="flex justify-between items-center mb-4 border-b border-border pb-1">
                <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{title}</h4>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onAdd}
                    className="h-7 text-xs"
                >
                    <Plus size={14} className="mr-1" /> Ajouter
                </Button>
            </div>
            <div className="space-y-4">
                {points && points.length > 0 ? (
                    points.map((pt: SpawnPoint, i: number) => (
                        <div key={i} className="flex gap-2 items-start bg-muted/40 p-3 rounded border border-border">
                            <div className="flex-1">
                                <VectorInput
                                    label={`Point #${i + 1}`}
                                    value={pt}
                                    onChange={(v: SpawnPoint) => onUpdate(i, v)}
                                    hasHeading={true}
                                />
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onRemove(i)}
                                className="text-destructive hover:text-destructive hover:bg-destructive/10 mt-6 h-8 w-8"
                                title="Supprimer"
                            >
                                <Trash2 size={16} />
                            </Button>
                        </div>
                    ))
                ) : (
                    <p className="text-muted-foreground text-xs italic text-center py-2 border border-dashed border-border rounded">
                        Aucun point configuré.
                    </p>
                )}
            </div>
        </div>
    )
}

export default JobGarage;
