"use client"

import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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

const REGEX_VECTOR3 = /^vector3\s*\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)\s*$/i;
const REGEX_VECTOR4 = /^vector4\s*\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)\s*$/i;

function vectorToStr(v: Vector | null, hasHeading: boolean): string {
    if (!v) return hasHeading ? 'vector4(0, 0, 0, 0)' : 'vector3(0, 0, 0)';
    const x = (v.x ?? 0).toFixed(2);
    const y = (v.y ?? 0).toFixed(2);
    const z = (v.z ?? 0).toFixed(2);
    const w = (v.w ?? v.heading ?? 0).toFixed(2);
    return hasHeading ? `vector4(${x}, ${y}, ${z}, ${w})` : `vector3(${x}, ${y}, ${z})`;
}

function parseVectorStr(str: string, hasHeading: boolean): Vector | null {
    const trimmed = str.trim();
    if (hasHeading) {
        const m = trimmed.match(REGEX_VECTOR4);
        if (m) return { x: parseFloat(m[1]), y: parseFloat(m[2]), z: parseFloat(m[3]), w: parseFloat(m[4]) };
        return null;
    }
    const m = trimmed.match(REGEX_VECTOR3);
    if (m) return { x: parseFloat(m[1]), y: parseFloat(m[2]), z: parseFloat(m[3]) };
    return null;
}

const VectorInput = ({ label, value, onChange, hasHeading = false }: VectorInputProps) => {
    const [inputStr, setInputStr] = useState<string>(() => vectorToStr(value, hasHeading));
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const expected = vectorToStr(value, hasHeading);
        setInputStr(expected);
        setError(null);
    }, [value?.x, value?.y, value?.z, value?.w, value?.heading, hasHeading]);

    const validateAndApply = () => {
        const parsed = parseVectorStr(inputStr, hasHeading);
        if (parsed) {
            setError(null);
            onChange(parsed);
        } else {
            const expected = hasHeading
                ? 'vector4(x, y, z, heading) — ex: vector4(252.28, -1376.35, 24.71, 145.51)'
                : 'vector3(x, y, z) — ex: vector3(252.53, -1383.86, 30.56)';
            setError(`Format attendu : ${expected}`);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') validateAndApply();
    };

    return (
        <div className="mb-4">
            <Label className="block text-xs font-medium text-muted-foreground mb-1">
                {label} {hasHeading ? '(Vector4)' : '(Vector3)'}
            </Label>
            <Input
                type="text"
                value={inputStr}
                onChange={(e) => {
                    setInputStr(e.target.value);
                    setError(null);
                }}
                onBlur={validateAndApply}
                onKeyDown={handleKeyDown}
                placeholder={hasHeading ? 'vector4(0, 0, 0, 0)' : 'vector3(0, 0, 0)'}
                className={`font-mono text-sm ${error ? 'border-destructive focus-visible:ring-destructive' : ''}`}
            />
            {error && <p className="text-xs text-destructive mt-1">{error}</p>}
        </div>
    );
};

export default VectorInput;
