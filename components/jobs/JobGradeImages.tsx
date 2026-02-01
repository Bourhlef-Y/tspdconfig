"use client"

import React, { useState } from 'react';
import { ImageIcon, Plus, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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

type GradeImagesData = Record<number, string>;

const JobGradeImages = ({ job, onChange }: { job: any; onChange: (j: any) => void }) => {
    const gradeImages: GradeImagesData = job?.gradeImages ?? {};
    const [alertState, setAlertState] = useState<{ open: boolean; title: string; description: string }>({ open: false, title: '', description: '' });
    const [promptGradeOpen, setPromptGradeOpen] = useState(false);
    const [promptGradeValue, setPromptGradeValue] = useState('');

    const setGradeImages = (next: GradeImagesData) => {
        onChange({ ...job, gradeImages: Object.keys(next).length ? next : {} });
    };

    const addGradeImageClick = () => {
        setPromptGradeValue('');
        setPromptGradeOpen(true);
    };

    const addGradeImageSubmit = () => {
        const grade = parseInt(promptGradeValue, 10);
        if (Number.isNaN(grade) || grade < 0) return;
        if (gradeImages[grade] !== undefined) {
            setPromptGradeOpen(false);
            setAlertState({ open: true, title: 'Grade existant', description: `Le grade ${grade} a déjà une image.` });
            return;
        }
        setGradeImages({ ...gradeImages, [grade]: '' });
        setPromptGradeOpen(false);
    };

    const removeGradeImage = (grade: number) => {
        const next = { ...gradeImages };
        delete next[grade];
        setGradeImages(next);
    };

    const setGradeImagePath = (grade: number, path: string) => {
        setGradeImages({ ...gradeImages, [grade]: path });
    };

    const grades = Object.keys(gradeImages)
        .map(Number)
        .filter((n) => !Number.isNaN(n))
        .sort((a, b) => a - b);

    return (
        <Card className="border-border">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <ImageIcon size={20} className="text-blue-500" /> Images des grades
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                    Chemin relatif depuis web/dist/ (ex: grades/police/1.png). Une image par grade pour l&apos;affichage HUD.
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <Label>Grade → chemin image</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addGradeImageClick}>
                        <Plus size={14} className="mr-1" /> Grade
                    </Button>
                </div>
                {grades.length === 0 && (
                    <p className="text-sm text-muted-foreground italic">Aucune image de grade. Ajoutez un grade pour définir un chemin.</p>
                )}
                <div className="space-y-2">
                    {grades.map((grade) => (
                        <div key={grade} className="flex items-center gap-2 flex-wrap p-2 rounded bg-muted/30">
                            <span className="text-xs font-medium w-12">Grade {grade}</span>
                            <Input
                                className="flex-1 min-w-[180px] text-xs font-mono"
                                value={gradeImages[grade] ?? ''}
                                onChange={(e) => setGradeImagePath(grade, e.target.value)}
                                placeholder="grades/job/grade_0.png"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-destructive"
                                onClick={() => removeGradeImage(grade)}
                            >
                                <Trash2 size={12} />
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>

            {/* Dialog : nouveau grade image */}
            <AlertDialog open={promptGradeOpen} onOpenChange={setPromptGradeOpen}>
                <AlertDialogContent className="sm:max-w-md">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Nouveau grade (image)</AlertDialogTitle>
                        <AlertDialogDescription>Numéro de grade (ex: 0, 1, 2…)</AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="py-2">
                        <Label htmlFor="grade-image-grade" className="sr-only">Grade</Label>
                        <Input
                            id="grade-image-grade"
                            type="number"
                            min={0}
                            value={promptGradeValue}
                            onChange={(e) => setPromptGradeValue(e.target.value)}
                            placeholder="0"
                            onKeyDown={(e) => e.key === 'Enter' && addGradeImageSubmit()}
                        />
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction onClick={addGradeImageSubmit}>Ajouter</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Alert : grade a déjà une image */}
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
        </Card>
    );
};

export default JobGradeImages;
