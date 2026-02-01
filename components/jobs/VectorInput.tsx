"use client"

import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Simple interface for vector (avoiding complex Typescript for now to speed up migration)
interface Vector {
    x: number;
    y: number;
    z: number;
    w?: number;
    heading?: number;
}

interface VectorInputProps {
    label: string;
    value: Vector;
    onChange: (val: Vector) => void;
    hasHeading?: boolean;
}

const VectorInput = ({ label, value, onChange, hasHeading = false }: VectorInputProps) => {
    const [localValue, setLocalValue] = useState<Vector>(value || { x: 0, y: 0, z: 0, w: 0 });

    useEffect(() => {
        setLocalValue(value || { x: 0, y: 0, z: 0, w: 0 });
    }, [value]);

    const handleChange = (axis: keyof Vector, val: string) => {
        const newVal = { ...localValue, [axis]: parseFloat(val) || 0 };
        setLocalValue(newVal);
        onChange(newVal);
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        const text = e.clipboardData.getData('text');
        // Try to parse vector3 or vector4 string
        const v4 = text.match(/vector4\s*\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)/);
        const v3 = text.match(/vector3\s*\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)/);

        if (v4) {
            e.preventDefault();
            const newVal = { x: parseFloat(v4[1]), y: parseFloat(v4[2]), z: parseFloat(v4[3]), w: parseFloat(v4[4]) };
            setLocalValue(newVal);
            onChange(newVal);
        } else if (v3) {
            e.preventDefault();
            const newVal = { x: parseFloat(v3[1]), y: parseFloat(v3[2]), z: parseFloat(v3[3]), w: localValue.w || 0 };
            setLocalValue(newVal);
            onChange(newVal);
        }
    };

    return (
        <div className="mb-4">
            <Label className="block text-xs font-medium text-muted-foreground mb-1">{label} {hasHeading ? '(Vector4)' : '(Vector3)'}</Label>
            <div className="flex gap-2">
                <Input
                    type="number"
                    step="0.01"
                    value={localValue.x}
                    onChange={(e) => handleChange('x', e.target.value)}
                    onPaste={handlePaste}
                    placeholder="X"
                    className="min-w-0"
                />
                <Input
                    type="number"
                    step="0.01"
                    value={localValue.y}
                    onChange={(e) => handleChange('y', e.target.value)}
                    onPaste={handlePaste}
                    placeholder="Y"
                    className="min-w-0"
                />
                <Input
                    type="number"
                    step="0.01"
                    value={localValue.z}
                    onChange={(e) => handleChange('z', e.target.value)}
                    onPaste={handlePaste}
                    placeholder="Z"
                    className="min-w-0"
                />
                {hasHeading && (
                    <Input
                        type="number"
                        step="0.01"
                        value={localValue.w !== undefined ? localValue.w : (localValue.heading !== undefined ? localValue.heading : 0)}
                        onChange={(e) => handleChange(localValue.heading !== undefined ? 'heading' : 'w', e.target.value)}
                        onPaste={handlePaste}
                        placeholder="H"
                        title="Heading / W"
                        className="min-w-0 border-l-2 border-l-primary/50"
                    />
                )}
            </div>
        </div>
    );
};

export default VectorInput;
