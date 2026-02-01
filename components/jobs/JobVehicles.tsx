"use client"

import React, { useState } from 'react';
import { Truck, Plus, Trash2, Helicopter, Ship } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
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

type VehicleListKey = 'vehicles' | 'heliVehicles' | 'boatVehicles';

const VehicleSection = ({
    title,
    icon: Icon,
    dataKey,
    job,
    onChange,
}: {
    title: string;
    icon: React.ElementType;
    dataKey: VehicleListKey;
    job: any;
    onChange: (j: any) => void;
}) => {
    const vehicles = job[dataKey] || {};
    const [alertState, setAlertState] = useState<{ open: boolean; title: string; description: string }>({ open: false, title: '', description: '' });
    const [promptCategoryOpen, setPromptCategoryOpen] = useState(false);
    const [promptCategoryValue, setPromptCategoryValue] = useState('');
    const [confirmCategoryOpen, setConfirmCategoryOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);

    const handleAddCategoryClick = () => {
        setPromptCategoryValue('');
        setPromptCategoryOpen(true);
    };

    const handleAddCategorySubmit = () => {
        const name = promptCategoryValue.trim();
        if (!name) return;
        if (vehicles[name]) {
            setAlertState({ open: true, title: 'Catégorie existante', description: `Une catégorie "${name}" existe déjà.` });
            setPromptCategoryOpen(false);
            return;
        }
        onChange({ ...job, [dataKey]: { ...vehicles, [name]: [] } });
        setPromptCategoryOpen(false);
    };

    const handleRemoveCategoryClick = (cat: string) => {
        setCategoryToDelete(cat);
        setConfirmCategoryOpen(true);
    };

    const confirmRemoveCategory = () => {
        if (!categoryToDelete) return;
        const next = { ...vehicles };
        delete next[categoryToDelete];
        onChange({ ...job, [dataKey]: next });
        setConfirmCategoryOpen(false);
        setCategoryToDelete(null);
    };

    const handleAddVehicle = (cat: string) => {
        const list = vehicles[cat] || [];
        onChange({ ...job, [dataKey]: { ...vehicles, [cat]: [...list, { label: 'Nouveau véhicule', model: '' }] } });
    };

    const handleRemoveVehicle = (cat: string, index: number) => {
        const list = (vehicles[cat] || []).filter((_: any, i: number) => i !== index);
        onChange({ ...job, [dataKey]: { ...vehicles, [cat]: list } });
    };

    const updateVehicle = (cat: string, index: number, field: string, value: string) => {
        const list = [...(vehicles[cat] || [])];
        list[index] = { ...list[index], [field]: value };
        onChange({ ...job, [dataKey]: { ...vehicles, [cat]: list } });
    };

    const handleRenameCategory = (oldCat: string, newCat: string) => {
        const trimmed = newCat.trim();
        if (!trimmed || trimmed === oldCat) return;
        if (vehicles[trimmed] !== undefined) {
            setAlertState({ open: true, title: 'Catégorie existante', description: `Une catégorie "${trimmed}" existe déjà.` });
            return;
        }
        const next = { ...vehicles };
        next[trimmed] = next[oldCat] || [];
        delete next[oldCat];
        onChange({ ...job, [dataKey]: next });
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-border pb-2">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <Icon size={18} className="text-muted-foreground" /> {title}
                </h4>
                <Button onClick={handleAddCategoryClick} size="sm" className="h-7 text-xs">
                    <Plus size={14} className="mr-1" /> Catégorie
                </Button>
            </div>
            {Object.keys(vehicles).length === 0 && (
                <p className="text-muted-foreground italic text-sm py-2">Aucune catégorie.</p>
            )}
            {Object.entries(vehicles).map(([category, list]: [string, any]) => (
                <div key={category} className="bg-muted/40 rounded-lg p-3 border border-border">
                    <div className="flex justify-between items-center gap-2 mb-2 pb-2 border-b border-border flex-wrap">
                        <Input
                            value={category}
                            onChange={(e) => handleRenameCategory(category, e.target.value)}
                            onBlur={(e) => handleRenameCategory(category, e.target.value.trim())}
                            placeholder="Nom de la catégorie"
                            className="font-medium text-sm max-w-[240px] h-8"
                        />
                        <div className="flex gap-2">
                            <Button variant="secondary" size="sm" className="h-6 text-xs" onClick={() => handleAddVehicle(category)}>
                                <Plus size={12} className="mr-1" /> Véhicule
                            </Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive hover:bg-destructive/10" onClick={() => handleRemoveCategoryClick(category)} title="Supprimer catégorie">
                                <Trash2 size={14} />
                            </Button>
                        </div>
                    </div>
                    <p className="text-[10px] text-muted-foreground mb-1">Catégorie (modifiable)</p>
                    <div className="space-y-2">
                        {(list || []).map((veh: any, idx: number) => (
                            <div key={idx} className="flex gap-2 items-center">
                                <Input type="text" value={veh.label} onChange={(e) => updateVehicle(category, idx, 'label', e.target.value)} placeholder="Nom" className="flex-1 h-8 text-sm" />
                                <Input type="text" value={veh.model} onChange={(e) => updateVehicle(category, idx, 'model', e.target.value)} placeholder="Modèle" className="w-32 font-mono h-8 text-sm" />
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={() => handleRemoveVehicle(category, idx)}>
                                    <Trash2 size={14} />
                                </Button>
                            </div>
                        ))}
                        {(!list || list.length === 0) && <p className="text-xs text-muted-foreground italic">Aucun véhicule.</p>}
                    </div>
                </div>
            ))}

            {/* Dialog : nouvelle catégorie */}
            <AlertDialog open={promptCategoryOpen} onOpenChange={setPromptCategoryOpen}>
                <AlertDialogContent className="sm:max-w-md">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Nouvelle catégorie</AlertDialogTitle>
                        <AlertDialogDescription>Nom de la catégorie pour {title}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="py-2">
                        <Label htmlFor="vehicle-category" className="sr-only">Nom de la catégorie</Label>
                        <Input
                            id="vehicle-category"
                            value={promptCategoryValue}
                            onChange={(e) => setPromptCategoryValue(e.target.value)}
                            placeholder="Nom de la catégorie"
                            onKeyDown={(e) => e.key === 'Enter' && handleAddCategorySubmit()}
                        />
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction onClick={handleAddCategorySubmit}>Ajouter</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Alert : catégorie existante */}
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

            {/* Confirm : supprimer catégorie */}
            <AlertDialog open={confirmCategoryOpen} onOpenChange={(open) => { setConfirmCategoryOpen(open); if (!open) setCategoryToDelete(null); }}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Supprimer la catégorie ?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Supprimer la catégorie &quot;{categoryToDelete}&quot; et ses véhicules ?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction variant="destructive" onClick={confirmRemoveCategory}>Supprimer</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

const JobVehicles = ({ job, onChange }: { job: any; onChange: (j: any) => void }) => {
    return (
        <Card className="border-border mt-4">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Truck size={20} className="text-blue-500" /> Véhicules
                </CardTitle>
                <p className="text-muted-foreground text-sm">Véhicules terrestres, hélicoptères et bateaux (si heliPoint / boatPoint définis).</p>
            </CardHeader>
            <CardContent className="space-y-8">
                <VehicleSection title="Véhicules terrestres" icon={Truck} dataKey="vehicles" job={job} onChange={onChange} />
                <VehicleSection title="Véhicules hélicoptères (heliVehicles)" icon={Helicopter} dataKey="heliVehicles" job={job} onChange={onChange} />
                <VehicleSection title="Véhicules bateaux (boatVehicles)" icon={Ship} dataKey="boatVehicles" job={job} onChange={onChange} />
            </CardContent>
        </Card>
    );
};

export default JobVehicles;
