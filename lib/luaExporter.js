
function formatVector3(v) {
    if (!v) return 'vector3(0.0, 0.0, 0.0)';
    const x = (v.x || 0).toFixed(2);
    const y = (v.y || 0).toFixed(2);
    const z = (v.z || 0).toFixed(2);
    return `vector3(${x}, ${y}, ${z})`;
}

function formatVector4(v) {
    if (!v) return 'vector4(0.0, 0.0, 0.0, 0.0)';
    const x = (v.x || 0).toFixed(2);
    const y = (v.y || 0).toFixed(2);
    const z = (v.z || 0).toFixed(2);
    const w = (v.w || (v.heading || 0)).toFixed(2);
    return `vector4(${x}, ${y}, ${z}, ${w})`;
}

function escapeLuaString(str) {
    if (!str) return '""';
    return `"${str.replace(/"/g, '\\"')}"`;
}

function valueToLua(val, depth = 0) {
    const indent = '    '.repeat(depth);

    if (typeof val === 'string') {
        return escapeLuaString(val);
    }
    if (typeof val === 'number') {
        return val.toString();
    }
    if (typeof val === 'boolean') {
        return val ? 'true' : 'false';
    }
    if (val === null || val === undefined) {
        return 'nil';
    }
    if (typeof val === 'object') {
        // Check for vectors
        if (val.w !== undefined || val.heading !== undefined) return formatVector4(val);
        if (val.x !== undefined && val.y !== undefined && val.z !== undefined) return formatVector3(val);

        const isArray = Array.isArray(val);
        const entries = Object.entries(val);
        if (entries.length === 0) return '{}';

        let items = [];
        entries.forEach(([k, v]) => {
            const keyPart = isArray ? '' : (/^\d+$/.test(k) ? `[${k}] = ` : `['${k}'] = `);
            items.push(`${indent}    ${keyPart}${valueToLua(v, depth + 1)}`);
        });

        return `{\n${items.join(',\n')}\n${indent}}`;
    }
    return 'nil';
}

export function exportToLua(config) {
    const lines = [];

    // Header
    lines.push("-- Generator by TSPD Config Editor");
    lines.push("Config = {}");
    lines.push("");
    lines.push("-- ==================================================================================== --");
    lines.push("--                                      JOBS                                          --");
    lines.push("-- ==================================================================================== --");

    // --- General (parametres uniquement ; staff regroupé avec Admin ci-dessous) ---
    lines.push("-- [ Général ] --");
    lines.push("-- parametres = Distance, Debug, OxTarget");
    if (config.General && config.General.parametres) {
        lines.push("Config.General = { ['parametres'] = " + valueToLua(config.General.parametres, 0) + " }");
    } else {
        lines.push("Config.General = { ['parametres'] = { ['DrawDistance'] = 100.0, ['Debug'] = false, ['UseOxTarget'] = false } }");
    }
    lines.push("");

    // --- Notifications (format éditeur : activation / evenements) ---
    lines.push("-- [ Notifications ] --");
    lines.push("-- activation = Activer tout, Son, Durée | evenements = Promotion, Rétrogradation, etc.");
    if (config.Notifications) {
        lines.push("Config.Notifications = " + valueToLua(config.Notifications, 0));
    } else {
        lines.push("Config.Notifications = { ['activation'] = { ['enabled'] = false, ['sound'] = false, ['duration'] = 5000 }, ['evenements'] = { ['gradeChange'] = false, ['promotion'] = false, ['demotion'] = false, ['fire'] = false, ['recruit'] = false } }");
    }
    lines.push("");

    // --- Staff & Admin regroupés (staffGroups = accès tenues/véhicules/armes ET menu admin) ---
    lines.push("-- [ Staff & Admin ] --");
    lines.push("-- staffGroups = accès tenues/véhicules/armes + menu admin");
    const staffGroups = config.General?.staff?.groups ?? [];
    const adminMenu = config.Admin?.menu ?? {};
    const adminObj = {
        enabled: adminMenu.enabled ?? false,
        command: adminMenu.command ?? 'jobadmin'
    };
    const staffAndAdmin = { staffGroups, admin: adminObj };
    lines.push("Config.StaffAndAdmin = " + valueToLua(staffAndAdmin, 0));
    lines.push("");

    // Si JobsRaw est fourni (contenu brut importé), l'utiliser
    lines.push("-- [ Configuration des Métiers ] --");
    if (config.JobsRaw && config.JobsRaw.trim()) {
        lines.push('Config.Jobs = ' + config.JobsRaw);
    } else if (config.Jobs && Object.keys(config.Jobs).length > 0) {
        // Génération structurée
        lines.push('Config.Jobs = ' + valueToLua(config.Jobs, 0));
    } else {
        lines.push('Config.Jobs = {}');
    }

    return lines.join('\n');
}

export function exportJobsOnly(jobs) {
    if (!jobs) return '{}';
    return valueToLua(jobs, 0);
}
