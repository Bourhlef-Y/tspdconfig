"use client"

import React, { useState } from 'react';
import { Crosshair, Plus, Trash2 } from 'lucide-react';
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

type WeaponEntry = { name: string; ammo: number; components?: string[] };

const JobWeaponPacks = ({ job, onChange }: { job: any; onChange: (j: any) => void }) => {
    const weaponPacks = job.weaponPacks || {};
    const [alertState, setAlertState] = useState<{ open: boolean; title: string; description: string }>({ open: false, title: '', description: '' });
    const [promptGradeOpen, setPromptGradeOpen] = useState(false);
    const [promptGradeValue, setPromptGradeValue] = useState('');
    const [promptPackOpen, setPromptPackOpen] = useState(false);
    const [promptPackGrade, setPromptPackGrade] = useState<number | null>(null);
    const [promptPackValue, setPromptPackValue] = useState('');
    const [confirmGradeOpen, setConfirmGradeOpen] = useState(false);
    const [confirmGrade, setConfirmGrade] = useState<number | null>(null);
    const [confirmPackOpen, setConfirmPackOpen] = useState(false);
    const [confirmPackData, setConfirmPackData] = useState<{ grade: number; packName: string } | null>(null);

    const grades = Object.keys(weaponPacks)
        .map((k) => parseInt(k, 10))
        .filter((n) => !Number.isNaN(n))
        .sort((a, b) => a - b);

    const handleAddGradeClick = () => {
        setPromptGradeValue('');
        setPromptGradeOpen(true);
    };

    const handleAddGradeSubmit = () => {
        const grade = parseInt(promptGradeValue, 10);
        if (Number.isNaN(grade) || grade < 0) return;
        if (weaponPacks[grade] !== undefined) {
            setPromptGradeOpen(false);
            setAlertState({ open: true, title: 'Grade existant', description: `Le grade ${grade} existe déjà.` });
            return;
        }
        onChange({ ...job, weaponPacks: { ...weaponPacks, [grade]: {} } });
        setPromptGradeOpen(false);
    };

    const handleRemoveGradeClick = (grade: number) => {
        setConfirmGrade(grade);
        setConfirmGradeOpen(true);
    };

    const confirmRemoveGrade = () => {
        if (confirmGrade === null) return;
        const next = { ...weaponPacks };
        delete next[confirmGrade];
        onChange({ ...job, weaponPacks: next });
        setConfirmGradeOpen(false);
        setConfirmGrade(null);
    };

    const handleAddPackClick = (grade: number) => {
        setPromptPackGrade(grade);
        setPromptPackValue('');
        setPromptPackOpen(true);
    };

    const handleAddPackSubmit = () => {
        const name = promptPackValue.trim();
        if (!name || promptPackGrade === null) return;
        const packs = weaponPacks[promptPackGrade] || {};
        if (packs[name]) {
            setPromptPackOpen(false);
            setAlertState({ open: true, title: 'Pack existant', description: 'Ce nom de pack existe déjà pour ce grade.' });
            return;
        }
        onChange({
            ...job,
            weaponPacks: { ...weaponPacks, [promptPackGrade]: { ...packs, [name]: [] } },
        });
        setPromptPackOpen(false);
        setPromptPackGrade(null);
    };

    const handleRemovePackClick = (grade: number, packName: string) => {
        setConfirmPackData({ grade, packName });
        setConfirmPackOpen(true);
    };

    const confirmRemovePack = () => {
        if (!confirmPackData) return;
        const packs = { ...(weaponPacks[confirmPackData.grade] || {}) };
        delete packs[confirmPackData.packName];
        onChange({ ...job, weaponPacks: { ...weaponPacks, [confirmPackData.grade]: packs } });
        setConfirmPackOpen(false);
        setConfirmPackData(null);
    };

    const handleRenamePack = (grade: number, oldPackName: string, newPackName: string) => {
        const trimmed = newPackName.trim();
        if (!trimmed || trimmed === oldPackName) return;
        const packs = weaponPacks[grade] || {};
        if (packs[trimmed] !== undefined) {
            setAlertState({ open: true, title: 'Pack existant', description: `Un pack "${trimmed}" existe déjà pour ce grade.` });
            return;
        }
        const nextPacks = { ...packs };
        nextPacks[trimmed] = nextPacks[oldPackName] || [];
        delete nextPacks[oldPackName];
        onChange({ ...job, weaponPacks: { ...weaponPacks, [grade]: nextPacks } });
    };

    const handleAddWeapon = (grade: number, packName: string) => {
        const packs = weaponPacks[grade] || {};
        const list = packs[packName] || [];
        onChange({
            ...job,
            weaponPacks: {
                ...weaponPacks,
                [grade]: { ...packs, [packName]: [...list, { name: 'WEAPON_PISTOL', ammo: 30 }] },
            },
        });
    };

    const handleRemoveWeapon = (grade: number, packName: string, index: number) => {
        const packs = weaponPacks[grade] || {};
        const list = (packs[packName] || []).filter((_: WeaponEntry, i: number) => i !== index);
        onChange({
            ...job,
            weaponPacks: { ...weaponPacks, [grade]: { ...packs, [packName]: list } },
        });
    };

    const updateWeapon = (
        grade: number,
        packName: string,
        index: number,
        field: keyof WeaponEntry,
        value: string | number | string[]
    ) => {
        const packs = weaponPacks[grade] || {};
        const list = [...(packs[packName] || [])];
        list[index] = { ...list[index], [field]: value };
        onChange({
            ...job,
            weaponPacks: { ...weaponPacks, [grade]: { ...packs, [packName]: list } },
        });
    };

    const componentsStr = (arr: string[] | undefined) => (Array.isArray(arr) ? arr.join(', ') : '');
    const setComponentsStr = (grade: number, packName: string, index: number, str: string) => {
        const arr = str
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean);
        updateWeapon(grade, packName, index, 'components', arr);
    };

    return (
        <Card className="border-border mt-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Crosshair size={20} className="text-blue-500" /> Armurerie (weaponPacks)
                </CardTitle>
                <Button onClick={handleAddGradeClick} size="sm" className="h-8">
                    <Plus size={16} className="mr-2" /> Nouveau Grade
                </Button>
            </CardHeader>

            <CardContent className="space-y-6">
                {grades.length === 0 && (
                    <div className="text-muted-foreground italic text-center py-8 border border-dashed border-border rounded-lg">
                        Aucun grade défini. Ajoutez un grade puis des packs par grade.
                    </div>
                )}

                {grades.map((grade) => {
                    const packs = weaponPacks[grade] || {};
                    const packNames = Object.keys(packs);
                    return (
                        <div key={grade} className="bg-muted/40 rounded-lg p-4 border border-border">
                            <div className="flex justify-between items-center mb-4 pb-2 border-b border-border">
                                <h4 className="font-bold text-foreground">Grade {grade}</h4>
                                <div className="flex gap-2">
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={() => handleAddPackClick(grade)}
                                        className="h-7 text-xs"
                                    >
                                        <Plus size={14} className="mr-1" /> Pack
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleRemoveGradeClick(grade)}
                                        className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                                        title="Supprimer grade"
                                    >
                                        <Trash2 size={16} />
                                    </Button>
                                </div>
                            </div>

                            {packNames.length === 0 && (
                                <p className="text-xs text-muted-foreground italic mb-3">Aucun pack pour ce grade.</p>
                            )}

                            {packNames.map((packName) => {
                                const list = (packs[packName] || []) as WeaponEntry[];
                                return (
                                    <div key={packName} className="ml-4 mb-4 p-3 rounded border border-border bg-card/50">
                                        <div className="flex justify-between items-center gap-2 mb-2 flex-wrap">
                                            <Input
                                                value={packName}
                                                onChange={(e) => handleRenamePack(grade, packName, e.target.value)}
                                                onBlur={(e) => handleRenamePack(grade, packName, e.target.value.trim())}
                                                placeholder="Nom du pack"
                                                className="font-medium text-sm h-8 max-w-[240px]"
                                            />
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-6 text-xs"
                                                    onClick={() => handleAddWeapon(grade, packName)}
                                                >
                                                    <Plus size={12} className="mr-1" /> Arme
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-6 w-6 text-destructive hover:bg-destructive/10"
                                                    onClick={() => handleRemovePackClick(grade, packName)}
                                                    title="Supprimer pack"
                                                >
                                                    <Trash2 size={14} />
                                                </Button>
                                            </div>
                                        </div>
                                        <p className="text-[10px] text-muted-foreground mb-1">Nom du pack (modifiable)</p>
                                        <div className="space-y-2">
                                            {list.map((weapon, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex flex-wrap gap-2 items-end p-2 rounded bg-muted/30 border border-border/50"
                                                >
                                                    <div className="flex-1 min-w-[140px]">
                                                        <Label className="text-xs text-muted-foreground">Arme</Label>
                                                        <Input
                                                            value={weapon.name}
                                                            onChange={(e) =>
                                                                updateWeapon(grade, packName, idx, 'name', e.target.value)
                                                            }
                                                            placeholder="WEAPON_PISTOL"
                                                            className="h-8 font-mono text-sm"
                                                        />
                                                    </div>
                                                    <div className="w-20">
                                                        <Label className="text-xs text-muted-foreground">Munitions</Label>
                                                        <Input
                                                            type="number"
                                                            min={0}
                                                            value={weapon.ammo}
                                                            onChange={(e) =>
                                                                updateWeapon(
                                                                    grade,
                                                                    packName,
                                                                    idx,
                                                                    'ammo',
                                                                    parseInt(e.target.value, 10) || 0
                                                                )
                                                            }
                                                            className="h-8"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-[160px]">
                                                        <Label className="text-xs text-muted-foreground">
                                                            Components (optionnel, séparés par des virgules)
                                                        </Label>
                                                        <Input
                                                            value={componentsStr(weapon.components)}
                                                            onChange={(e) =>
                                                                setComponentsStr(grade, packName, idx, e.target.value)
                                                            }
                                                            placeholder="COMPONENT_AT_PI_FLSH"
                                                            className="h-8 font-mono text-xs"
                                                        />
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-destructive hover:bg-destructive/10 shrink-0"
                                                        onClick={() => handleRemoveWeapon(grade, packName, idx)}
                                                    >
                                                        <Trash2 size={14} />
                                                    </Button>
                                                </div>
                                            ))}
                                            {list.length === 0 && (
                                                <p className="text-xs text-muted-foreground italic">
                                                    Aucune arme dans ce pack.
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </CardContent>

            {/* Dialog : nouveau grade */}
            <AlertDialog open={promptGradeOpen} onOpenChange={setPromptGradeOpen}>
                <AlertDialogContent className="sm:max-w-md">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Nouveau grade</AlertDialogTitle>
                        <AlertDialogDescription>Grade (numéro, ex: 0, 1, 2…)</AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="py-2">
                        <Label htmlFor="weapon-grade" className="sr-only">Grade</Label>
                        <Input
                            id="weapon-grade"
                            type="number"
                            min={0}
                            value={promptGradeValue}
                            onChange={(e) => setPromptGradeValue(e.target.value)}
                            placeholder="0"
                            onKeyDown={(e) => e.key === 'Enter' && handleAddGradeSubmit()}
                        />
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction onClick={handleAddGradeSubmit}>Ajouter</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Dialog : nouveau pack */}
            <AlertDialog open={promptPackOpen} onOpenChange={(open) => { setPromptPackOpen(open); if (!open) setPromptPackGrade(null); }}>
                <AlertDialogContent className="sm:max-w-md">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Nouveau pack</AlertDialogTitle>
                        <AlertDialogDescription>Nom du pack (ex: Police Secours, BMO)</AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="py-2">
                        <Label htmlFor="weapon-pack-name" className="sr-only">Nom du pack</Label>
                        <Input
                            id="weapon-pack-name"
                            value={promptPackValue}
                            onChange={(e) => setPromptPackValue(e.target.value)}
                            placeholder="Police Secours, BMO"
                            onKeyDown={(e) => e.key === 'Enter' && handleAddPackSubmit()}
                        />
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction onClick={handleAddPackSubmit}>Ajouter</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Alert : messages divers */}
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

            {/* Confirm : supprimer grade */}
            <AlertDialog open={confirmGradeOpen} onOpenChange={(open) => { setConfirmGradeOpen(open); if (!open) setConfirmGrade(null); }}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Supprimer le grade ?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Supprimer le grade {confirmGrade} et tous ses packs ?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction variant="destructive" onClick={confirmRemoveGrade}>Supprimer</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Confirm : supprimer pack */}
            <AlertDialog open={confirmPackOpen} onOpenChange={(open) => { setConfirmPackOpen(open); if (!open) setConfirmPackData(null); }}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Supprimer le pack ?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Supprimer le pack &quot;{confirmPackData?.packName}&quot; ?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction variant="destructive" onClick={confirmRemovePack}>Supprimer</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Card>
    );
};

export default JobWeaponPacks;
