"use client"

import React from 'react';
import { Settings, Bell, Palette, Shield } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const SectionGeneral = ({ config, setConfig }: { config: any, setConfig: (c: any) => void }) => {

    // Safety check / defaults
    const notifications = config?.Notifications || { enabled: false, sound: false, duration: 5000 };
    const ui = config?.UI || { theme: "dark", hudMode: "normal", animations: true };
    const admin = config?.Admin || { enabled: false, command: "", groups: [] };

    const updateConfig = (key: string, value: any) => {
        setConfig({ ...config, [key]: value });
    };

    const updateNested = (parent: string, key: string, value: any) => {
        setConfig({
            ...config,
            [parent]: {
                ...(config[parent] || {}),
                [key]: value
            }
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
                [key]: list
            }
        });
    }

    return (
        <div className="space-y-6">
            {/* GÉNÉRAL */}
            <Card className="border-border">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <Settings size={20} className="text-blue-500" /> Général
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label>Distance d'affichage (DrawDistance)</Label>
                        <Input
                            type="number"
                            value={config.DrawDistance || 0}
                            onChange={(e) => updateConfig('DrawDistance', parseFloat(e.target.value))}
                        />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded border border-border">
                        <div className="space-y-1">
                            <Label>Mode Debug</Label>
                            <p className="text-xs text-muted-foreground">Affiche tous les markers/points.</p>
                        </div>
                        <Switch
                            checked={config.Debug || false}
                            onCheckedChange={(c) => updateConfig('Debug', c)}
                        />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded border border-border">
                        <div className="space-y-1">
                            <Label>Utiliser OxTarget</Label>
                            <p className="text-xs text-muted-foreground">Active le ciblage "troisième œil".</p>
                        </div>
                        <Switch
                            checked={config.UseOxTarget || false}
                            onCheckedChange={(c) => updateConfig('UseOxTarget', c)}
                        />
                    </div>

                    <div className="space-y-2 col-span-2">
                        <Label>Groupes Staff (séparés par virgule)</Label>
                        <Input
                            value={config.StaffGroups?.join(', ') || ''}
                            onChange={(e) => updateArray('StaffGroups', e.target.value.split(',').map(s => s.trim()))}
                            placeholder="admin, moderator..."
                        />
                    </div>
                </CardContent>
            </Card>

            {/* NOTIFICATIONS */}
            <Card className="border-border">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <Bell size={20} className="text-yellow-500" /> Notifications
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="flex items-center justify-between p-3 bg-muted/20 rounded border border-border">
                        <Label>Activer tout</Label>
                        <Switch checked={notifications.enabled || false} onCheckedChange={(c) => updateNested('Notifications', 'enabled', c)} />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/20 rounded border border-border">
                        <Label>Son</Label>
                        <Switch checked={notifications.sound || false} onCheckedChange={(c) => updateNested('Notifications', 'sound', c)} />
                    </div>

                    <div className="space-y-2">
                        <Label>Durée (ms)</Label>
                        <Input
                            type="number"
                            value={notifications.duration || 5000}
                            onChange={(e) => updateNested('Notifications', 'duration', parseInt(e.target.value))}
                        />
                    </div>

                    {/* Toggles spécifiques */}
                    {['gradeChange', 'promotion', 'demotion', 'fire', 'recruit'].map(key => (
                        <div key={key} className="flex items-center justify-between p-3 bg-muted/20 rounded border border-border opacity-90">
                            <Label className="capitalize">{key}</Label>
                            <Switch checked={notifications[key] || false} onCheckedChange={(c) => updateNested('Notifications', key, c)} />
                        </div>
                    ))}
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* UI */}
                <Card className="border-border">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Palette size={20} className="text-purple-500" /> Interface (HUD)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Thème</Label>
                            <select
                                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                value={ui.theme || 'dark'}
                                onChange={(e) => updateNested('UI', 'theme', e.target.value)}
                            >
                                <option value="dark">Dark</option>
                                <option value="light">Light</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label>Mode HUD</Label>
                            <select
                                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                value={ui.hudMode || 'normal'}
                                onChange={(e) => updateNested('UI', 'hudMode', e.target.value)}
                            >
                                <option value="normal">Normal</option>
                                <option value="compact">Compact</option>
                            </select>
                        </div>
                        <div className="flex items-center justify-between">
                            <Label>Animations</Label>
                            <Switch checked={ui.animations || false} onCheckedChange={(c) => updateNested('UI', 'animations', c)} />
                        </div>
                    </CardContent>
                </Card>

                {/* ADMIN */}
                <Card className="border-border">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Shield size={20} className="text-red-500" /> Administration
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label>Activer Menu Admin</Label>
                            <Switch checked={admin.enabled || false} onCheckedChange={(c) => updateNested('Admin', 'enabled', c)} />
                        </div>
                        <div className="space-y-2">
                            <Label>Commande</Label>
                            <Input
                                value={admin.command || ''}
                                onChange={(e) => updateNested('Admin', 'command', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Groupes autorisés</Label>
                            <Input
                                value={admin.groups?.join(', ') || ''}
                                onChange={(e) => updateArrayNested('Admin', 'groups', e.target.value.split(',').map(s => s.trim()))}
                                placeholder="admin, superadmin..."
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default SectionGeneral;
