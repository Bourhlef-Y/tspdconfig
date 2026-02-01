"use client"

import React, { useState } from 'react';
import { Shirt, Plus, Trash2, ChevronDown, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
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

const COMPONENT_KEYS = ['undershirt', 'jacket', 'pants', 'shoes', 'mask', 'arms', 'bags', 'chain', 'decals', 'armor', 'helmet', 'glasses'];

type ComponentEntry = { id: number; txt: number };
type GenderUniform = Record<string, ComponentEntry>;
type UniformData = { male: GenderUniform; female: GenderUniform };
type GradeUniforms = Record<string, UniformData>;
type UniformsData = Record<number, GradeUniforms>;

const emptyComponent = (): ComponentEntry => ({ id: 0, txt: 0 });
const emptyUniform = (): UniformData => ({ male: {}, female: {} });

const JobUniforms = ({ job, onChange }: { job: any; onChange: (j: any) => void }) => {
    const uniforms: UniformsData = job?.uniforms ?? {};
    const [expandedGrade, setExpandedGrade] = useState<number | null>(Object.keys(uniforms).map(Number)[0] ?? null);
    const [expandedUniform, setExpandedUniform] = useState<string | null>(null);
    const [alertState, setAlertState] = useState<{ open: boolean; title: string; description: string }>({ open: false, title: '', description: '' });
    const [promptGradeOpen, setPromptGradeOpen] = useState(false);
    const [promptGradeValue, setPromptGradeValue] = useState('');
    const [promptUniformOpen, setPromptUniformOpen] = useState(false);
    const [promptUniformGrade, setPromptUniformGrade] = useState<number | null>(null);
    const [promptUniformValue, setPromptUniformValue] = useState('');
    const [confirmGradeOpen, setConfirmGradeOpen] = useState(false);
    const [confirmGrade, setConfirmGrade] = useState<number | null>(null);
    const [confirmUniformOpen, setConfirmUniformOpen] = useState(false);
    const [confirmUniformData, setConfirmUniformData] = useState<{ grade: number; uniformName: string } | null>(null);

    const grades = Object.keys(uniforms)
        .map(Number)
        .filter((n) => !Number.isNaN(n))
        .sort((a, b) => a - b);

    const setUniforms = (next: UniformsData) => {
        onChange({ ...job, uniforms: Object.keys(next).length ? next : {} });
    };

    const addGradeClick = () => {
        setPromptGradeValue('');
        setPromptGradeOpen(true);
    };

    const addGradeSubmit = () => {
        const grade = parseInt(promptGradeValue, 10);
        if (Number.isNaN(grade) || grade < 0) return;
        if (uniforms[grade] !== undefined) {
            setPromptGradeOpen(false);
            setAlertState({ open: true, title: 'Grade existant', description: `Le grade ${grade} existe déjà.` });
            return;
        }
        setUniforms({ ...uniforms, [grade]: {} });
        setExpandedGrade(grade);
        setPromptGradeOpen(false);
    };

    const removeGradeClick = (grade: number) => {
        setConfirmGrade(grade);
        setConfirmGradeOpen(true);
    };

    const confirmRemoveGrade = () => {
        if (confirmGrade === null) return;
        const next = { ...uniforms };
        delete next[confirmGrade];
        setUniforms(next);
        if (expandedGrade === confirmGrade) setExpandedGrade(grades[0] ?? null);
        setConfirmGradeOpen(false);
        setConfirmGrade(null);
    };

    const addUniformClick = (grade: number) => {
        setPromptUniformGrade(grade);
        setPromptUniformValue('');
        setPromptUniformOpen(true);
    };

    const addUniformSubmit = () => {
        const name = promptUniformValue.trim();
        if (!name || promptUniformGrade === null) return;
        const gradeData = uniforms[promptUniformGrade] ?? {};
        if (gradeData[name]) {
            setPromptUniformOpen(false);
            setAlertState({ open: true, title: 'Tenue existante', description: 'Cette tenue existe déjà pour ce grade.' });
            return;
        }
        setUniforms({ ...uniforms, [promptUniformGrade]: { ...gradeData, [name]: emptyUniform() } });
        setExpandedUniform(name);
        setPromptUniformOpen(false);
        setPromptUniformGrade(null);
    };

    const removeUniformClick = (grade: number, uniformName: string) => {
        setConfirmUniformData({ grade, uniformName });
        setConfirmUniformOpen(true);
    };

    const confirmRemoveUniform = () => {
        if (!confirmUniformData) return;
        const gradeData = { ...(uniforms[confirmUniformData.grade] || {}) };
        delete gradeData[confirmUniformData.uniformName];
        setUniforms({ ...uniforms, [confirmUniformData.grade]: gradeData });
        if (expandedUniform === confirmUniformData.uniformName) setExpandedUniform(null);
        setConfirmUniformOpen(false);
        setConfirmUniformData(null);
    };

    const setUniformData = (grade: number, uniformName: string, data: UniformData) => {
        const gradeData = { ...(uniforms[grade] || {}) };
        gradeData[uniformName] = data;
        setUniforms({ ...uniforms, [grade]: gradeData });
    };

    const addComponent = (grade: number, uniformName: string, gender: 'male' | 'female') => {
        const uniform = uniforms[grade]?.[uniformName] ?? emptyUniform();
        const comps = uniform[gender] || {};
        const key = COMPONENT_KEYS.find((k) => !(k in comps)) || 'undershirt';
        setUniformData(grade, uniformName, {
            ...uniform,
            [gender]: { ...comps, [key]: emptyComponent() },
        });
    };

    const removeComponent = (grade: number, uniformName: string, gender: 'male' | 'female', compKey: string) => {
        const uniform = uniforms[grade]?.[uniformName] ?? emptyUniform();
        const comps = { ...(uniform[gender] || {}) };
        delete comps[compKey];
        setUniformData(grade, uniformName, { ...uniform, [gender]: comps });
    };

    const setComponent = (grade: number, uniformName: string, gender: 'male' | 'female', compKey: string, field: 'id' | 'txt', value: number) => {
        const uniform = uniforms[grade]?.[uniformName] ?? emptyUniform();
        const comps = { ...(uniform[gender] || {}) };
        comps[compKey] = { ...(comps[compKey] || emptyComponent()), [field]: value };
        setUniformData(grade, uniformName, { ...uniform, [gender]: comps });
    };

    const setComponentKey = (grade: number, uniformName: string, gender: 'male' | 'female', oldKey: string, newKey: string) => {
        const k = newKey.trim();
        if (!k || oldKey === k) return;
        const uniform = uniforms[grade]?.[uniformName] ?? emptyUniform();
        const comps = { ...(uniform[gender] || {}) };
        const entry = comps[oldKey] ?? emptyComponent();
        delete comps[oldKey];
        comps[k] = entry;
        setUniformData(grade, uniformName, { ...uniform, [gender]: comps });
    };

    return (
        <Card className="border-border">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Shirt size={20} className="text-blue-500" /> Uniformes
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                    Par grade : tenues disponibles. Chaque tenue a des composants male/female : <strong>nom</strong> (composant : undershirt, jacket, pants…), <strong>id</strong> (drawable), <strong>txt</strong> (texture).
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <Label>Grades et tenues</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addGradeClick}>
                        <Plus size={14} className="mr-1" /> Grade
                    </Button>
                </div>

                {grades.length === 0 && (
                    <p className="text-sm text-muted-foreground italic">Aucun grade. Ajoutez un grade pour définir des tenues.</p>
                )}

                {grades.map((grade) => {
                    const gradeData = uniforms[grade] ?? {};
                    const uniformNames = Object.keys(gradeData);
                    const isGradeOpen = expandedGrade === grade;

                    return (
                        <div key={grade} className="border border-border rounded-lg overflow-hidden">
                            <div
                                role="button"
                                tabIndex={0}
                                className="w-full flex items-center justify-between p-3 bg-muted/40 hover:bg-muted/60 text-left cursor-pointer rounded-t-lg"
                                onClick={() => setExpandedGrade(isGradeOpen ? null : grade)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        setExpandedGrade(isGradeOpen ? null : grade);
                                    }
                                }}
                            >
                                <span className="flex items-center gap-2 font-medium">
                                    {isGradeOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                                    Grade {grade}
                                </span>
                                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                    <span className="text-xs text-muted-foreground">{uniformNames.length} tenue(s)</span>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                        onClick={() => removeGradeClick(grade)}
                                    >
                                        <Trash2 size={14} />
                                    </Button>
                                </div>
                            </div>
                            {isGradeOpen && (
                                <div className="p-3 pt-0 space-y-3 border-t border-border">
                                    <div className="flex justify-end">
                                        <Button type="button" variant="outline" size="sm" onClick={() => addUniformClick(grade)}>
                                            <Plus size={14} className="mr-1" /> Tenue
                                        </Button>
                                    </div>
                                    {uniformNames.map((uniformName) => {
                                        const uniform = gradeData[uniformName] ?? emptyUniform();
                                        const isUniformOpen = expandedUniform === uniformName;
                                        return (
                                            <div key={uniformName} className="rounded border border-border bg-card">
                                                <div
                                                    role="button"
                                                    tabIndex={0}
                                                    className="w-full flex items-center justify-between p-2.5 text-left text-sm cursor-pointer"
                                                    onClick={() => setExpandedUniform(isUniformOpen ? null : uniformName)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter' || e.key === ' ') {
                                                            e.preventDefault();
                                                            setExpandedUniform(isUniformOpen ? null : uniformName);
                                                        }
                                                    }}
                                                >
                                                    <span className="flex items-center gap-2">
                                                        {isUniformOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                                        {uniformName}
                                                    </span>
                                                    <span onClick={(e) => e.stopPropagation()}>
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-7 text-destructive hover:text-destructive"
                                                            onClick={() => removeUniformClick(grade, uniformName)}
                                                        >
                                                            <Trash2 size={12} />
                                                        </Button>
                                                    </span>
                                                </div>
                                                {isUniformOpen && (
                                                    <div className="p-3 pt-0 space-y-4 border-t border-border">
                                                        {(['male', 'female'] as const).map((gender) => {
                                                            const comps = uniform[gender] ?? {};
                                                            const compKeys = Object.keys(comps);
                                                            return (
                                                                <div key={gender} className="space-y-2">
                                                                    <div className="flex items-center justify-between">
                                                                        <Label className="text-xs uppercase text-muted-foreground">{gender}</Label>
                                                                        <Button
                                                                            type="button"
                                                                            variant="ghost"
                                                                            size="sm"
                                                                            className="h-7 text-xs"
                                                                            onClick={() => addComponent(grade, uniformName, gender)}
                                                                        >
                                                                            <Plus size={12} className="mr-1" /> Composant
                                                                        </Button>
                                                                    </div>
                                                                    <div className="grid gap-2">
                                                                        {compKeys.length > 0 && (
                                                                            <div className="flex items-center gap-2 flex-wrap px-2 text-[10px] uppercase text-muted-foreground">
                                                                                <span className="w-[130px]">Nom (composant)</span>
                                                                                <span className="w-16">id (drawable)</span>
                                                                                <span className="w-16">txt (texture)</span>
                                                                            </div>
                                                                        )}
                                                                        {compKeys.map((compKey) => {
                                                                            const entry = comps[compKey] ?? emptyComponent();
                                                                            return (
                                                                                <div
                                                                                    key={compKey}
                                                                                    className="flex items-center gap-2 flex-wrap p-2 rounded bg-muted/30"
                                                                                >
                                                                                    <Select
                                                                                        value={COMPONENT_KEYS.includes(compKey) ? compKey : '__custom__'}
                                                                                        onValueChange={(v) => setComponentKey(grade, uniformName, gender, compKey, v === '__custom__' ? 'other' : v)}
                                                                                    >
                                                                                        <SelectTrigger className="w-[130px] h-8 text-xs">
                                                                                            <SelectValue />
                                                                                        </SelectTrigger>
                                                                                        <SelectContent>
                                                                                            {COMPONENT_KEYS.map((k) => (
                                                                                                <SelectItem key={k} value={k}>
                                                                                                    {k}
                                                                                                </SelectItem>
                                                                                            ))}
                                                                                            <SelectItem value="__custom__">Autre</SelectItem>
                                                                                        </SelectContent>
                                                                                    </Select>
                                                                                    {!COMPONENT_KEYS.includes(compKey) && (
                                                                                        <Input
                                                                                            className="w-24 h-8 text-xs font-mono"
                                                                                            defaultValue={compKey}
                                                                                            onBlur={(e) => {
                                                                                                const v = e.target.value.trim();
                                                                                                if (v && v !== compKey) setComponentKey(grade, uniformName, gender, compKey, v);
                                                                                            }}
                                                                                            placeholder="nom composant"
                                                                                        />
                                                                                    )}
                                                                                    <Input
                                                                                        type="number"
                                                                                        className="w-16 h-8 text-xs"
                                                                                        value={entry.id}
                                                                                        onChange={(e) => setComponent(grade, uniformName, gender, compKey, 'id', parseInt(e.target.value, 10) || 0)}
                                                                                        placeholder="id (drawable)"
                                                                                        title="Drawable"
                                                                                    />
                                                                                    <Input
                                                                                        type="number"
                                                                                        className="w-16 h-8 text-xs"
                                                                                        value={entry.txt}
                                                                                        onChange={(e) => setComponent(grade, uniformName, gender, compKey, 'txt', parseInt(e.target.value, 10) || 0)}
                                                                                        placeholder="txt (texture)"
                                                                                        title="Texture"
                                                                                    />
                                                                                    <Button
                                                                                        type="button"
                                                                                        variant="ghost"
                                                                                        size="sm"
                                                                                        className="h-8 w-8 p-0 text-destructive"
                                                                                        onClick={() => removeComponent(grade, uniformName, gender, compKey)}
                                                                                    >
                                                                                        <Trash2 size={12} />
                                                                                    </Button>
                                                                                </div>
                                                                            );
                                                                        })}
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </CardContent>

            {/* Dialog : nouveau grade */}
            <AlertDialog open={promptGradeOpen} onOpenChange={setPromptGradeOpen}>
                <AlertDialogContent className="sm:max-w-md">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Nouveau grade</AlertDialogTitle>
                        <AlertDialogDescription>Numéro de grade (ex: 0, 1, 2…)</AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="py-2">
                        <Label htmlFor="uniform-grade" className="sr-only">Grade</Label>
                        <Input
                            id="uniform-grade"
                            type="number"
                            min={0}
                            value={promptGradeValue}
                            onChange={(e) => setPromptGradeValue(e.target.value)}
                            placeholder="0"
                            onKeyDown={(e) => e.key === 'Enter' && addGradeSubmit()}
                        />
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction onClick={addGradeSubmit}>Ajouter</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Dialog : nouvelle tenue */}
            <AlertDialog open={promptUniformOpen} onOpenChange={(open) => { setPromptUniformOpen(open); if (!open) setPromptUniformGrade(null); }}>
                <AlertDialogContent className="sm:max-w-md">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Nouvelle tenue</AlertDialogTitle>
                        <AlertDialogDescription>Nom de la tenue (ex: Police Secours, BMO)</AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="py-2">
                        <Label htmlFor="uniform-name" className="sr-only">Nom de la tenue</Label>
                        <Input
                            id="uniform-name"
                            value={promptUniformValue}
                            onChange={(e) => setPromptUniformValue(e.target.value)}
                            placeholder="Police Secours, BMO"
                            onKeyDown={(e) => e.key === 'Enter' && addUniformSubmit()}
                        />
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction onClick={addUniformSubmit}>Ajouter</AlertDialogAction>
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
                            Supprimer le grade {confirmGrade} et toutes ses tenues ?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction variant="destructive" onClick={confirmRemoveGrade}>Supprimer</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Confirm : supprimer tenue */}
            <AlertDialog open={confirmUniformOpen} onOpenChange={(open) => { setConfirmUniformOpen(open); if (!open) setConfirmUniformData(null); }}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Supprimer la tenue ?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Supprimer la tenue &quot;{confirmUniformData?.uniformName}&quot; ?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction variant="destructive" onClick={confirmRemoveUniform}>Supprimer</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Card>
    );
};

export default JobUniforms;
