"use client"

import React from 'react';
import { Settings, Bell, Palette, Shield, type LucideIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { defaultEditorSchema } from '@/lib/configParser';

const ICONS: Record<string, LucideIcon> = {
    Settings,
    Bell,
    Palette,
    Shield,
};

type FieldDef = {
    key: string;
    label: string;
    type: string;
    description?: string;
    placeholder?: string;
    options?: { value: string; label: string }[];
};

type GroupDef = { label: string; dataPath?: string; rootPath?: string; fields: FieldDef[] };

type SectionDef = {
    id: string;
    title: string;
    icon: string;
    dataPath: string | null;
    fields?: FieldDef[];
    groups?: GroupDef[];
};

const SectionGeneral = ({ config, setConfig }: { config: any; setConfig: (c: any) => void }) => {
    const schema = config?.Editor?.sections ?? defaultEditorSchema.sections;

    const updateConfig = (key: string, value: any) => {
        setConfig({ ...config, [key]: value });
    };

    const updateNested = (parent: string, key: string, value: any) => {
        setConfig({
            ...config,
            [parent]: {
                ...(config[parent] || {}),
                [key]: value,
            },
        });
    };

    const updateArray = (parent: string, list: string[]) => {
        setConfig({ ...config, [parent]: list });
    };

    const updateArrayNested = (parent: string, key: string, list: string[]) => {
        setConfig({
            ...config,
            [parent]: {
                ...(config[parent] || {}),
                [key]: list,
            },
        });
    };

    const getValue = (section: SectionDef, group: GroupDef | undefined, field: FieldDef) => {
        let data: any = config;
        const sectionRoot = group?.rootPath ?? section.dataPath;
        if (sectionRoot) data = config?.[sectionRoot];
        if (group?.dataPath && data) data = data[group.dataPath];
        return data?.[field.key];
    };

    const setValue = (section: SectionDef, group: GroupDef | undefined, field: FieldDef, value: any) => {
        const sectionRoot = group?.rootPath ?? section.dataPath;
        if (group?.dataPath && sectionRoot) {
            const parent = config[sectionRoot] || {};
            const groupData = parent[group.dataPath] || {};
            const newGroupData = field.type === 'stringArray'
                ? { ...groupData, [field.key]: Array.isArray(value) ? value : value.split(',').map((s: string) => s.trim()) }
                : { ...groupData, [field.key]: value };
            setConfig({
                ...config,
                [sectionRoot]: { ...parent, [group.dataPath]: newGroupData },
            });
        } else if (sectionRoot) {
            if (field.type === 'stringArray') {
                updateArrayNested(sectionRoot, field.key, Array.isArray(value) ? value : value.split(',').map((s: string) => s.trim()));
            } else {
                updateNested(sectionRoot, field.key, value);
            }
        } else {
            if (field.type === 'stringArray') {
                updateArray(field.key, Array.isArray(value) ? value : value.split(',').map((s: string) => s.trim()));
            } else {
                updateConfig(field.key, value);
            }
        }
    };

    const renderField = (section: SectionDef, group: GroupDef | undefined, field: FieldDef, disabled?: boolean) => {
        const value = getValue(section, group, field);
        const baseClass = 'p-3 bg-muted/20 rounded border border-border';
        const disabledClass = disabled ? 'opacity-50 pointer-events-none' : '';

        if (field.type === 'boolean') {
            return (
                <div key={field.key} className={`flex items-center justify-between ${baseClass} ${disabledClass}`}>
                    <div className="space-y-1">
                        <Label className={disabled ? 'text-muted-foreground' : ''}>{field.label}</Label>
                        {field.description && <p className="text-xs text-muted-foreground">{field.description}</p>}
                    </div>
                    <Switch
                        checked={!!value}
                        onCheckedChange={(c) => setValue(section, group, field, c)}
                        disabled={disabled}
                    />
                </div>
            );
        }

        if (field.type === 'number') {
            return (
                <div key={field.key} className={`space-y-2 ${disabledClass}`}>
                    <Label className={disabled ? 'text-muted-foreground' : ''}>{field.label}</Label>
                    {field.description && <p className="text-xs text-muted-foreground">{field.description}</p>}
                    <Input
                        type="number"
                        value={value ?? ''}
                        onChange={(e) => setValue(section, group, field, Number(e.target.value) || 0)}
                        disabled={disabled}
                    />
                </div>
            );
        }

        if (field.type === 'string' || field.type === 'stringArray') {
            const displayValue = Array.isArray(value) ? value.join(', ') : (value ?? '');
            return (
                <div key={field.key} className={`space-y-2 ${disabledClass}`}>
                    <Label className={disabled ? 'text-muted-foreground' : ''}>{field.label}</Label>
                    {field.description && <p className="text-xs text-muted-foreground">{field.description}</p>}
                    <Input
                        value={displayValue}
                        onChange={(e) => setValue(section, group, field, e.target.value)}
                        placeholder={field.placeholder}
                        disabled={disabled}
                    />
                </div>
            );
        }

        if (field.type === 'select' && field.options) {
            return (
                <div key={field.key} className={`space-y-2 ${disabledClass}`}>
                    <Label className={disabled ? 'text-muted-foreground' : ''}>{field.label}</Label>
                    <select
                        className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        value={value ?? field.options[0]?.value}
                        onChange={(e) => setValue(section, group, field, e.target.value)}
                        disabled={disabled}
                    >
                        {field.options.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>
            );
        }

        return null;
    };

    const renderSection = (section: SectionDef) => {
        const IconComponent = ICONS[section.icon] ?? Settings;
        const hasGroups = section.groups && section.groups.length > 0;

        return (
            <Card key={section.id} className="border-border">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <IconComponent size={20} className="text-blue-500" /> {section.title}
                    </CardTitle>
                </CardHeader>
                <CardContent className={hasGroups ? 'space-y-6' : 'grid grid-cols-1 md:grid-cols-2 gap-6'}>
                    {hasGroups ? (
                        section.groups!.map((group) => {
                            const notificationsOff = section.id === 'notifications' && !config.Notifications?.activation?.enabled;
                            const greyEvenements = section.id === 'notifications' && group.dataPath === 'evenements' && notificationsOff;
                            const greyActivationExceptEnabled = section.id === 'notifications' && group.dataPath === 'activation' && notificationsOff;
                            return (
                                <div key={group.label} className="space-y-4">
                                    <h4 className={`text-sm font-medium border-b border-border pb-2 ${greyEvenements || greyActivationExceptEnabled ? 'text-muted-foreground/70' : 'text-muted-foreground'}`}>
                                        {group.label}
                                        {greyEvenements && <span className="block text-xs font-normal mt-1">Activez les notifications ci-dessus pour modifier.</span>}
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {group.fields.map((field) => {
                                            const fieldDisabled = greyEvenements
                                                ? true
                                                : greyActivationExceptEnabled && field.key !== 'enabled';
                                            return renderField(section, group, field, fieldDisabled);
                                        })}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        section.fields?.map((field) => (
                            <div key={field.key} className={field.type === 'boolean' ? '' : 'space-y-2'}>
                                {renderField(section, undefined, field)}
                            </div>
                        ))
                    )}
                </CardContent>
            </Card>
        );
    };

    return (
        <div className="space-y-6">
            {schema.map((section: SectionDef) => renderSection(section))}
        </div>
    );
};

export default SectionGeneral;
