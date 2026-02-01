
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
            const keyPart = isArray ? '' : `['${k}'] = `;
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

    // Si JobsRaw est fourni (contenu brut importé), l'utiliser
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
