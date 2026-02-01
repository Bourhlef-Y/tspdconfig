/** Schéma UI/UX par défaut : le config pilote l'interface (sections, groupes, libellés). */
export const defaultEditorSchema = {
    sections: [
        {
            id: 'general-and-admin',
            title: 'Général & Admin',
            icon: 'Settings',
            dataPath: 'General',
            groups: [
                {
                    label: 'Paramètres',
                    dataPath: 'parametres',
                    fields: [
                        { key: 'DrawDistance', label: "Distance d'interaction", type: 'number', description: "Distance en mètres pour interagir avec les points (accueil, vestiaire, garage, etc.). Indépendant du mode Debug." },
                        { key: 'Debug', label: 'Mode Debug', type: 'boolean', description: 'Affiche les markers pour tous les points (utile pour repérer les emplacements en jeu). N\'affecte pas la distance d\'interaction.' },
                        { key: 'UseOxTarget', label: 'Utiliser OxTarget', type: 'boolean', description: 'Active le ciblage "troisième œil".' }
                    ]
                },
                {
                    label: 'Staff (staffGroups)',
                    dataPath: 'staff',
                    fields: [
                        { key: 'groups', label: 'Groupes Staff', type: 'stringArray', description: 'Groupes avec accès tenues/véhicules/armes et menu admin', placeholder: 'admin, moderator...' }
                    ]
                },
                {
                    label: 'Admin',
                    dataPath: 'menu',
                    rootPath: 'Admin',
                    fields: [
                        { key: 'enabled', label: 'Activer Menu Admin', type: 'boolean' },
                        { key: 'command', label: 'Commande', type: 'string' }
                    ]
                }
            ]
        },
        {
            id: 'notifications',
            title: 'Notifications',
            icon: 'Bell',
            dataPath: 'Notifications',
            groups: [
                {
                    label: 'Activation',
                    dataPath: 'activation',
                    fields: [
                        { key: 'enabled', label: 'Activer tout', type: 'boolean' },
                        { key: 'sound', label: 'Son', type: 'boolean' },
                        { key: 'duration', label: 'Durée (ms)', type: 'number' }
                    ]
                },
                {
                    label: 'Événements',
                    dataPath: 'evenements',
                    fields: [
                        { key: 'gradeChange', label: 'Changement de grade', type: 'boolean' },
                        { key: 'promotion', label: 'Promotion', type: 'boolean' },
                        { key: 'demotion', label: 'Rétrogradation', type: 'boolean' },
                        { key: 'fire', label: 'Licenciement', type: 'boolean' },
                        { key: 'recruit', label: 'Recrutement', type: 'boolean' }
                    ]
                }
            ]
        },
    ]
};

export const defaultConfig = {
    General: {
        parametres: { DrawDistance: 100.0, Debug: false, UseOxTarget: false },
        staff: { groups: [] }
    },
    Notifications: {
        activation: { enabled: false, sound: false, duration: 5000 },
        evenements: { gradeChange: false, promotion: false, demotion: false, fire: false, recruit: false }
    },
    Admin: {
        menu: { enabled: false, command: 'tspd_admin' }
    },
    Editor: defaultEditorSchema,
    JobsRaw: null,
    Jobs: {
        police: {
            label: "Police Nationale",
            color: "#1e40af",
            whitelisted: false,
            recruiterGrade: 1,
            bossGrade: 2,
            recruiterPoint: { x: 259.85, y: -1374.73, z: 30.56 },
            bossPoint: { x: 264.3, y: -1371.21, z: 34.04 },
            accueil: { x: 252.53, y: -1383.86, z: 30.56 },
            vestiaire: { x: 251.96, y: -1388.63, z: 37.72 },
            armurerie: { x: 266.75, y: -1371.74, z: 30.56 },
            heliPoint: { x: 0, y: 0, z: 0 },
            boatPoint: { x: 0, y: 0, z: 0 },

            garage: {
                spawn: { x: 252.28, y: -1376.35, z: 24.71, w: 145.51 },
                spawnPoint: null,
                spawnPoints: [
                    { x: 233.43, y: -1376.73, z: 24.71, w: 235.8 }
                ],
                deletePoint: { x: 247.23, y: -1406.73, z: 24.71 },
                spawnCheckRadius: 3.0,
                heliSpawnPoints: [],
                boatSpawnPoints: []
            },

            peds: {
                accueil: { enabled: true, model: "s_f_y_cop_01", coords: { x: 253.37, y: -1384.88, z: 30.56, w: 129.75 } },
                vestiaire: { enabled: false, model: "", coords: { x: 0, y: 0, z: 0, w: 0 } },
                armurerie: { enabled: false, model: "", coords: { x: 0, y: 0, z: 0, w: 0 } },
                garage: { enabled: false, model: "", coords: { x: 0, y: 0, z: 0, w: 0 } },
                heliPoint: { enabled: false, model: "", coords: { x: 0, y: 0, z: 0, w: 0 } },
                boatPoint: { enabled: false, model: "", coords: { x: 0, y: 0, z: 0, w: 0 } },
                recruiterPoint: { enabled: false, model: "", coords: { x: 0, y: 0, z: 0, w: 0 } },
                bossPoint: { enabled: false, model: "", coords: { x: 0, y: 0, z: 0, w: 0 } }
            },

            vehicles: {
                "[PS] Police Secours": [
                    { label: "BMW R1200 RT", model: "bmr12pn" }
                ]
            },
            heliVehicles: {},
            boatVehicles: {},
            uniforms: {},
            gradeImages: {}
        }
    }
};

// --- HELPER FUNCTIONS ---

const EXTRACT_REGEX = /\s*(local\s+\w+\s*=\s*)?({[\s\S]*})/;
// Regex pour vector3(x,y,z)
const REGEX_VECTOR3 = /vector3\s*\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)/;
// Regex pour vector4(x,y,z,w)
const REGEX_VECTOR4 = /vector4\s*\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)/;


/** Essaie ['key'] = value puis key = value (notation Lua sans crochets). */
function parseBoolFromBlock(block, key) {
    let m = block.match(new RegExp(`\\['${key}'\\]\\s*=\\s*(true|false)`));
    if (m) return m[1] === 'true';
    m = block.match(new RegExp(`\\b${key}\\s*=\\s*(true|false)`));
    return m ? m[1] === 'true' : false;
}
function parseStrFromBlock(block, key) {
    let m = block.match(new RegExp(`\\['${key}'\\]\\s*=\\s*"([^"]*)"`));
    if (m) return m[1];
    m = block.match(new RegExp(`\\b${key}\\s*=\\s*"([^"]*)"`));
    return m ? m[1] : '';
}
function parseIntFromBlock(block, key) {
    let m = block.match(new RegExp(`\\['${key}'\\]\\s*=\\s*(\\d+)`));
    if (m) return parseInt(m[1], 10);
    m = block.match(new RegExp(`\\b${key}\\s*=\\s*(\\d+)`));
    return m ? parseInt(m[1], 10) : 0;
}

function extractBlockContent(content, blockName) {
    const patterns = [blockName + ' = {', blockName + '={', blockName + ' ={', blockName + '= {'];
    let startIdx = -1;
    let prefixLen = 0;
    for (const p of patterns) {
        const idx = content.indexOf(p);
        if (idx !== -1) {
            startIdx = idx;
            prefixLen = p.length;
            break;
        }
    }
    if (startIdx === -1) return null;
    const braceStart = content.indexOf('{', startIdx);

    let openBrackets = 0;
    let foundStart = false;
    let endIdx = -1;

    for (let i = braceStart; i < content.length; i++) {
        if (content[i] === '{') {
            openBrackets++;
            foundStart = true;
        } else if (content[i] === '}') {
            openBrackets--;
        }

        if (foundStart && openBrackets === 0) {
            endIdx = i + 1;
            break;
        }
    }

    if (endIdx !== -1) {
        return content.substring(startIdx, endIdx);
    }
    return null;
}

function parseVector(valStr) {
    if (!valStr) return null;
    const v4 = valStr.match(REGEX_VECTOR4);
    if (v4) return { x: parseFloat(v4[1]), y: parseFloat(v4[2]), z: parseFloat(v4[3]), w: parseFloat(v4[4]) };

    const v3 = valStr.match(REGEX_VECTOR3);
    if (v3) return { x: parseFloat(v3[1]), y: parseFloat(v3[2]), z: parseFloat(v3[3]) };

    return null;
}

/** Extrait un bloc type vehicles/heliVehicles/boatVehicles = { ... } et le parse en { "Catégorie": [ { label, model } ], ... } */
function parseVehiclesLikeBlock(jobBody, blockName) {
    const escaped = blockName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp('(?:^|[^a-zA-Z_])' + escaped + '\\s*=\\s*\\{');
    const match = jobBody.match(re);
    if (!match) return null;
    const vehiclesStart = match.index + (match[0].length - 1);
    const openBrace = vehiclesStart;
    if (openBrace === -1) return null;
    const closeBrace = findBlockEnd(jobBody, openBrace);
    if (closeBrace === -1) return null;
    const block = jobBody.substring(openBrace, closeBrace + 1);
    const result = {};
    let pos = 0;
    while (pos < block.length) {
        const keyStartD = block.indexOf('["', pos);
        const keyStartS = block.indexOf("['", pos);
        let keyStart, quoteChar, keyEnd;
        if (keyStartD !== -1 && (keyStartS === -1 || keyStartD < keyStartS)) {
            keyStart = keyStartD; quoteChar = '"'; keyEnd = block.indexOf('"]', keyStart + 2);
        } else if (keyStartS !== -1) {
            keyStart = keyStartS; quoteChar = "'"; keyEnd = block.indexOf("']", keyStart + 2);
        } else break;
        if (keyEnd === -1) break;
        const categoryName = block.substring(keyStart + 2, keyEnd).replace(/\\"/g, '"');
        const valueStart = block.indexOf('{', keyEnd + 2);
        if (valueStart === -1) break;
        const valueEnd = findBlockEnd(block, valueStart);
        if (valueEnd === -1) break;
        const valueContent = block.substring(valueStart, valueEnd + 1);
        const vehicles = [];
        let searchStart = 0;
        for (;;) {
            const entryStart = valueContent.indexOf('{', searchStart);
            if (entryStart === -1) break;
            const afterBrace = valueContent.substring(entryStart + 1, entryStart + 25).replace(/\s+/g, ' ');
            if (!afterBrace.startsWith('label ') && !afterBrace.startsWith('label=')) {
                searchStart = entryStart + 1;
                continue;
            }
            const entryEnd = findBlockEnd(valueContent, entryStart);
            if (entryEnd === -1) break;
            const entryStr = valueContent.substring(entryStart, entryEnd + 1);
            const labelMatch = entryStr.match(/label\s*=\s*["']([^"']*)["']/);
            const modelMatch = entryStr.match(/model\s*=\s*["']([^"']*)["']/);
            if (labelMatch && modelMatch) {
                vehicles.push({
                    label: labelMatch[1].replace(/\\"/g, '"'),
                    model: modelMatch[1].replace(/\\"/g, '"')
                });
            }
            searchStart = entryEnd + 1;
        }
        result[categoryName] = vehicles;
        pos = valueEnd + 1;
    }
    return Object.keys(result).length ? result : null;
}

function parseVehiclesBlock(jobBody) {
    return parseVehiclesLikeBlock(jobBody, 'vehicles');
}

function parseHeliVehiclesBlock(jobBody) {
    return parseVehiclesLikeBlock(jobBody, 'heliVehicles');
}

function parseBoatVehiclesBlock(jobBody) {
    return parseVehiclesLikeBlock(jobBody, 'boatVehicles');
}

/** Extrait le bloc garage = { ... } et parse spawn, spawnPoints, deletePoint, etc. */
function parseGarageBlock(jobBody) {
    const garageStart = jobBody.indexOf('garage');
    if (garageStart === -1) return null;
    const openBrace = jobBody.indexOf('{', garageStart);
    if (openBrace === -1) return null;
    const closeBrace = findBlockEnd(jobBody, openBrace);
    if (closeBrace === -1) return null;
    const block = jobBody.substring(openBrace, closeBrace + 1);
    const garage = JSON.parse(JSON.stringify(defaultConfig.Jobs.police.garage));
    const spawnMatch = block.match(/spawn\s*=\s*(vector4\s*\([^)]+\))/);
    if (spawnMatch) {
        const v = parseVector(spawnMatch[1]);
        if (v) garage.spawn = v;
    }
    const deleteMatch = block.match(/deletePoint\s*=\s*(vector3\s*\([^)]+\))/);
    if (deleteMatch) {
        const v = parseVector(deleteMatch[1]);
        if (v) garage.deletePoint = v;
    }
    const radiusMatch = block.match(/spawnCheckRadius\s*=\s*([\d.]+)/);
    if (radiusMatch) garage.spawnCheckRadius = parseFloat(radiusMatch[1]);
    // spawnPoint (ancien format, un seul point)
    const spawnPointMatch = block.match(/spawnPoint\s*=\s*(vector4\s*\([^)]+\))/);
    if (spawnPointMatch) {
        const v = parseVector(spawnPointMatch[1]);
        if (v) garage.spawnPoint = v;
    }
    // Liste vector4 depuis un sous-bloc (spawnPoints, heliSpawnPoints, boatSpawnPoints)
    function parseVector4ListInBlock(block, key) {
        const start = block.indexOf(key);
        if (start === -1) return null;
        const brace = block.indexOf('{', start);
        if (brace === -1) return null;
        const end = findBlockEnd(block, brace);
        if (end === -1) return null;
        const content = block.substring(brace, end + 1);
        const vec4Regex = /vector4\s*\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)/g;
        const points = [];
        let m;
        while ((m = vec4Regex.exec(content)) !== null) {
            points.push({ x: parseFloat(m[1]), y: parseFloat(m[2]), z: parseFloat(m[3]), w: parseFloat(m[4]) });
        }
        return points;
    }
    const spList = parseVector4ListInBlock(block, 'spawnPoints');
    if (spList && spList.length) garage.spawnPoints = spList;
    const heliList = parseVector4ListInBlock(block, 'heliSpawnPoints');
    if (heliList && heliList.length) garage.heliSpawnPoints = heliList;
    const boatList = parseVector4ListInBlock(block, 'boatSpawnPoints');
    if (boatList && boatList.length) garage.boatSpawnPoints = boatList;
    return garage;
}

/** Extrait le bloc peds = { ... } et parse les 8 slots (accueil, vestiaire, armurerie, garage, heliPoint, boatPoint, recruiterPoint, bossPoint). */
const PED_KEYS = ['accueil', 'vestiaire', 'armurerie', 'garage', 'heliPoint', 'boatPoint', 'recruiterPoint', 'bossPoint'];

function parsePedsBlock(jobBody) {
    const pedsStart = jobBody.indexOf('peds');
    if (pedsStart === -1) return null;
    const openBrace = jobBody.indexOf('{', pedsStart);
    if (openBrace === -1) return null;
    const closeBrace = findBlockEnd(jobBody, openBrace);
    if (closeBrace === -1) return null;
    const block = jobBody.substring(openBrace, closeBrace + 1);
    const result = {};
    for (const key of PED_KEYS) {
        const re = new RegExp('(?:^|[^a-zA-Z_])' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*=\\s*\\{');
        const match = block.match(re);
        if (!match) continue;
        const keyStart = match.index + match[0].length - 1;
        const subBrace = keyStart;
        if (subBrace === -1) continue;
        const subEnd = findBlockEnd(block, subBrace);
        if (subEnd === -1) continue;
        const sub = block.substring(subBrace, subEnd + 1);
        const enabledMatch = sub.match(/(?:^|\s)enabled\s*=\s*(true|false)/);
        const modelMatch = sub.match(/(?:^|\s)model\s*=\s*["']([^"']*)["']/);
        const coordsMatch = sub.match(/(?:^|\s)coords\s*=\s*(vector4\s*\([^)]+\))/);
        result[key] = {
            enabled: enabledMatch ? enabledMatch[1] === 'true' : false,
            model: modelMatch ? modelMatch[1].replace(/\\"/g, '"') : '',
            coords: coordsMatch ? parseVector(coordsMatch[1]) : { x: 0, y: 0, z: 0, w: 0 }
        };
    }
    return Object.keys(result).length ? result : null;
}

/** Parse une entrée arme: { name = "WEAPON_X", ammo = N } ou avec components = {"C1"} */
function parseWeaponEntry(str) {
    const nameMatch = str.match(/name\s*=\s*["']([^"']*)["']/);
    const ammoMatch = str.match(/ammo\s*=\s*(\d+)/);
    if (!nameMatch || !ammoMatch) return null;
    const entry = { name: nameMatch[1].replace(/\\"/g, '"'), ammo: parseInt(ammoMatch[1], 10) };
    const compMatch = str.match(/components\s*=\s*\{([^}]*)\}/);
    if (compMatch) {
        const compStr = compMatch[1];
        const compList = compStr.match(/["']([^"']*)["']/g);
        if (compList) entry.components = compList.map(s => s.replace(/^["']|["']$/g, ''));
    }
    return entry;
}

/** Extrait weaponPacks = { [grade] = { ["PackName"] = { {name, ammo, components?}, ... } }, ... } */
function parseWeaponPacksBlock(jobBody) {
    const wpStart = jobBody.indexOf('weaponPacks');
    if (wpStart === -1) return null;
    const openBrace = jobBody.indexOf('{', wpStart);
    if (openBrace === -1) return null;
    const closeBrace = findBlockEnd(jobBody, openBrace);
    if (closeBrace === -1) return null;
    const block = jobBody.substring(openBrace + 1, closeBrace);
    const result = {};
    let pos = 0;
    const gradeKeyRegex = /\[(\d+)\]\s*=\s*\{/g;
    let gradeMatch;
    while ((gradeMatch = gradeKeyRegex.exec(block)) !== null) {
        const grade = parseInt(gradeMatch[1], 10);
        const gradeBlockStart = gradeMatch.index + gradeMatch[0].length - 1;
        const gradeBlockEnd = findBlockEnd(block, gradeBlockStart);
        if (gradeBlockEnd === -1) continue;
        const gradeBlock = block.substring(gradeBlockStart, gradeBlockEnd + 1);
        const gradePacks = {};
        const packKeyRegex = /\[["']([^"']*)["']\]\s*=\s*\{/g;
        let packMatch;
        while ((packMatch = packKeyRegex.exec(gradeBlock)) !== null) {
            const packName = packMatch[1].replace(/\\"/g, '"');
            const packBlockStart = packMatch.index + packMatch[0].length - 1;
            const packBlockEnd = findBlockEnd(gradeBlock, packBlockStart);
            if (packBlockEnd === -1) continue;
            const packContent = gradeBlock.substring(packBlockStart, packBlockEnd + 1);
            const weapons = [];
            let searchStart = 0;
            for (;;) {
                const weaponStart = packContent.indexOf('{', searchStart);
                if (weaponStart === -1) break;
                const afterBrace = packContent.substring(weaponStart + 1, weaponStart + 20).replace(/\s+/g, ' ');
                if (!afterBrace.startsWith('name ') && !afterBrace.startsWith('name=')) {
                    searchStart = weaponStart + 1;
                    continue;
                }
                const weaponEnd = findBlockEnd(packContent, weaponStart);
                if (weaponEnd === -1) break;
                const entryStr = packContent.substring(weaponStart, weaponEnd + 1);
                const entry = parseWeaponEntry(entryStr);
                if (entry) weapons.push(entry);
                searchStart = weaponEnd + 1;
            }
            gradePacks[packName] = weapons;
        }
        result[grade] = gradePacks;
    }
    return Object.keys(result).length ? result : null;
}

/** Parse un bloc male ou female: ['key'] = {id = N, txt = N}, ... */
function parseUniformComponentsBlock(block) {
    const result = {};
    // Match ['key'] = {id = N, txt = N} ou key = {id = N, txt = N}
    const re = /(?:^|,)\s*\[?['"]?(\w+)['"]?\]?\s*=\s*\{\s*id\s*=\s*(\d+)\s*,\s*txt\s*=\s*(\d+)/g;
    let m;
    while ((m = re.exec(block)) !== null) {
        result[m[1]] = { id: parseInt(m[2], 10), txt: parseInt(m[3], 10) };
    }
    return result;
}

/** Trouve les clés ["Name"] = { ou ['Name'] = { au premier niveau du bloc (depth 1 si le bloc commence par {). */
function findTopLevelNamedBlocks(block) {
    const entries = [];
    let depth = 0;
    let i = 0;
    const len = block.length;
    while (i < len) {
        const c = block[i];
        if (c === '{') depth++;
        else if (c === '}') depth--;
        else if (depth === 1 && c === '[') {
            const keyStart = i;
            i++;
            if (i >= len || (block[i] !== '"' && block[i] !== "'")) { i++; continue; }
            const quoteChar = block[i];
            i++;
            const keyContentStart = i;
            while (i < len && block[i] !== quoteChar) {
                if (block[i] === '\\') i++;
                i++;
            }
            if (i >= len) break;
            const keyEnd = i;
            i++;
            if (i >= len || block[i] !== ']') { i++; continue; }
            i++;
            let key = block.substring(keyContentStart, keyEnd);
            if (quoteChar === '"') key = key.replace(/\\"/g, '"');
            while (i < len && /[\s,=]/.test(block[i])) i++;
            if (i < len && block[i] === '{') {
                const blockStart = i;
                const blockEnd = findBlockEnd(block, blockStart);
                if (blockEnd !== -1) {
                    entries.push({ name: key, start: blockStart, end: blockEnd });
                    i = blockEnd;
                }
            }
        }
        i++;
    }
    return entries;
}

/** Extrait uniforms = { [grade] = { ["TenueName"] = { male = {...}, female = {...} } }, ... } */
function parseUniformsBlock(jobBody) {
    const uniformsBlock = extractBlockContent(jobBody, 'uniforms');
    if (!uniformsBlock) return null;
    const brace = uniformsBlock.indexOf('{');
    if (brace === -1) return null;
    const block = uniformsBlock.substring(brace + 1, uniformsBlock.length - 1);
    const result = {};
    const gradeKeyRegex = /\[(\d+)\]\s*=\s*\{/g;
    let gradeMatch;
    while ((gradeMatch = gradeKeyRegex.exec(block)) !== null) {
        const grade = parseInt(gradeMatch[1], 10);
        const gradeBlockStart = gradeMatch.index + gradeMatch[0].length - 1;
        const gradeBlockEnd = findBlockEnd(block, gradeBlockStart);
        if (gradeBlockEnd === -1) continue;
        const gradeBlock = block.substring(gradeBlockStart, gradeBlockEnd + 1);
        const gradeUniforms = {};
        const entries = findTopLevelNamedBlocks(gradeBlock);
        for (const { name: uniformName, start: uniformBlockStart, end: uniformBlockEnd } of entries) {
            const uniformBlock = gradeBlock.substring(uniformBlockStart, uniformBlockEnd + 1);
            let male = {};
            let female = {};
            const maleMatch = uniformBlock.match(/\bmale\s*=\s*\{/);
            if (maleMatch) {
                const maleStart = uniformBlock.indexOf('{', maleMatch.index);
                const maleEnd = findBlockEnd(uniformBlock, maleStart);
                if (maleEnd !== -1) male = parseUniformComponentsBlock(uniformBlock.substring(maleStart, maleEnd + 1));
            }
            const femaleMatch = uniformBlock.match(/\bfemale\s*=\s*\{/);
            if (femaleMatch) {
                const femaleStart = uniformBlock.indexOf('{', femaleMatch.index);
                const femaleEnd = findBlockEnd(uniformBlock, femaleStart);
                if (femaleEnd !== -1) female = parseUniformComponentsBlock(uniformBlock.substring(femaleStart, femaleEnd + 1));
            }
            gradeUniforms[uniformName] = { male, female };
        }
        result[grade] = gradeUniforms;
    }
    return Object.keys(result).length ? result : null;
}

/** Extrait gradeImages = { [0] = "path", [1] = "path2", ... } -> { 0: "path", 1: "path2", ... } */
function parseGradeImagesBlock(jobBody) {
    const block = extractBlockContent(jobBody, 'gradeImages');
    if (!block) return null;
    const brace = block.indexOf('{');
    if (brace === -1) return null;
    const content = block.substring(brace + 1, block.length - 1);
    const result = {};
    const re = /\[(\d+)\]\s*=\s*["']([^"']*)["']/g;
    let m;
    while ((m = re.exec(content)) !== null) {
        result[parseInt(m[1], 10)] = m[2].replace(/\\"/g, '"');
    }
    return Object.keys(result).length ? result : null;
}

function parseJobContent(jobBody) {
    const job = JSON.parse(JSON.stringify(defaultConfig.Jobs.police)); // Clone default

    // Basic Fields : ne prendre que label/color au niveau racine du job (début ou après \n), pas ceux dans vehicles { label = "...", model = "..." }
    const labelMatch = jobBody.match(/(?:^|\n)\s*label\s*=\s*"([^"]*)"/);
    if (labelMatch) job.label = labelMatch[1].replace(/\\"/g, '"');

    const colorMatch = jobBody.match(/(?:^|\n)\s*color\s*=\s*"([^"]*)"/);
    if (colorMatch) job.color = colorMatch[1];

    const whiteListMatch = jobBody.match(/whitelisted\s*=\s*(true|false)/);
    if (whiteListMatch) job.whitelisted = whiteListMatch[1] === 'true';

    const recruiterGradeMatch = jobBody.match(/recruiterGrade\s*=\s*(\d+)/);
    if (recruiterGradeMatch) job.recruiterGrade = parseInt(recruiterGradeMatch[1], 10);
    const bossGradeMatch = jobBody.match(/bossGrade\s*=\s*(\d+)/);
    if (bossGradeMatch) job.bossGrade = parseInt(bossGradeMatch[1], 10);

    // Locations
    ['recruiterPoint', 'bossPoint', 'accueil', 'vestiaire', 'armurerie', 'heliPoint', 'boatPoint'].forEach(pt => {
        const regex = new RegExp(`${pt}\\s*=\\s*(vector[34]\\([^)]+\\))`);
        const match = jobBody.match(regex);
        if (match) {
            const vec = parseVector(match[1]);
            if (vec) job[pt] = vec;
        }
    });

    // Garage (spawn, spawnPoints, deletePoint, spawnCheckRadius)
    const garage = parseGarageBlock(jobBody);
    if (garage) job.garage = garage;

    // Peds (8 slots : accueil, vestiaire, armurerie, garage, heliPoint, boatPoint, recruiterPoint, bossPoint)
    const peds = parsePedsBlock(jobBody);
    if (peds) job.peds = peds;

    // Vehicles (toutes les catégories et véhicules)
    const vehicles = parseVehiclesBlock(jobBody);
    if (vehicles) job.vehicles = vehicles;

    // heliVehicles / boatVehicles (même structure que vehicles)
    const heliVehicles = parseHeliVehiclesBlock(jobBody);
    if (heliVehicles) job.heliVehicles = heliVehicles;
    const boatVehicles = parseBoatVehiclesBlock(jobBody);
    if (boatVehicles) job.boatVehicles = boatVehicles;

    // WeaponPacks: [grade] = { ["PackName"] = [ { name, ammo, components? } ] }
    const weaponPacks = parseWeaponPacksBlock(jobBody);
    if (weaponPacks) job.weaponPacks = weaponPacks;

    // uniforms : parsing structuré [grade][uniformName] = { male: { compKey: {id, txt} }, female: {...} }
    const uniforms = parseUniformsBlock(jobBody);
    if (uniforms) job.uniforms = uniforms;

    // gradeImages : [grade] = "path" -> { grade: "path", ... }
    const gradeImages = parseGradeImagesBlock(jobBody);
    if (gradeImages) job.gradeImages = gradeImages;

    return job;
}

function parseJobs(luaContent) {
    const jobsContent = extractBlockContent(luaContent, 'Config.Jobs');
    if (!jobsContent) return {};

    const jobs = {};

    // Improved parser: Scan the string and respect nesting blocks.

    // Find the actual table content, ignoring "Config.Jobs = " prefix
    const firstBrace = jobsContent.indexOf('{');
    const lastBrace = jobsContent.lastIndexOf('}');

    if (firstBrace === -1 || lastBrace === -1) return {};

    const innerContent = jobsContent.substring(firstBrace + 1, lastBrace);

    let depth = 0;
    let inString = false;
    let stringChar = null;
    let keyStart = -1;
    let capturingKey = false;

    // We try to identify "['JOB_ID'] = {" pattern

    // Since implementing a full Lua parser is complex, we will stick to a smarter regex approach
    // We iterate over the matches but verify their depth.

    // Or better: we iterate the string, track brackets, and when depth is 0, we look for assignments.

    const jobRegex = /\['([\w-]+)'\]\s*=\s*\{/g;
    let match;

    // But regex.exec ignores braces context. We must do it manually.

    for (let i = 0; i < innerContent.length; i++) {
        const char = innerContent[i];

        // String handling
        if ((char === '"' || char === "'") && innerContent[i - 1] !== '\\') {
            if (!inString) {
                inString = true;
                stringChar = char;
            } else if (char === stringChar) {
                inString = false;
                stringChar = null;
            }
        }

        if (inString) continue;

        if (char === '{') {
            depth++;
            // If we just entered depth 1, it MIGHT be the start of a job block value.
            // We need to check if what preceded was a key assignment.
        } else if (char === '}') {
            depth--;
        }

        // Detect Job Key at depth 0
        // We look for pattern: ['KEY'] = {
        // We can use the regex, but check if the match index is at a "safe" place (depth 0).
    }

    // --- BETTER APPROACH ---
    // Extract everything that matches the job pattern, but check if it's "valid" manually? No too hard.
    // Let's use the brace counting method to extract EACH top-level property.

    let currentPos = 0;
    let braceBalance = 0;
    let lastSplit = 0;

    // We want to split by comma, BUT ignoring commas inside braces/strings.
    // Actually we don't need to split by comma. We just need to find "['key'] = { ... }" blocks.

    const potentialJobs = [];

    for (let i = 0; i < innerContent.length; i++) {
        const char = innerContent[i];
        // String handling
        if ((char === '"' || char === "'") && innerContent[i - 1] !== '\\') {
            if (!inString) {
                inString = true;
                stringChar = char;
            } else if (char === stringChar) {
                inString = false;
                stringChar = null;
            }
        }
        if (inString) continue;

        if (char === '{') braceBalance++;
        if (char === '}') braceBalance--;
    }

    // Okay, simple iteration with Regex exec is fine IF we verify that BEFORE the match, the brace balance was 0.
    // BUT regex.exec jumps over content.

    // Let's iterate manually and when we see `['`, if depth is 0, we treat it as a potential job key start.

    let localDepth = 0;

    let cursor = 0;
    const len = innerContent.length;

    while (cursor < len) {
        // Skip comments -- (basic support)
        if (innerContent.startsWith('--', cursor)) {
            const endLine = innerContent.indexOf('\n', cursor);
            cursor = endLine === -1 ? len : endLine + 1;
            continue;
        }

        const char = innerContent[cursor];

        // Strings
        if (char === '"' || char === "'") {
            const endQuote = findEndQuote(innerContent, cursor, char);
            cursor = endQuote + 1;
            continue;
        }

        if (char === '{') {
            localDepth++;
        } else if (char === '}') {
            localDepth--;
        }

        // If at depth 0, look for assignment "['KEY'] = {"
        if (localDepth === 0 && char === '[') {
            // Check if it matches "['KEY'] = {"
            // We use a sticky regex or substring match
            const sub = innerContent.substring(cursor);
            const match = sub.match(/^\[['"]([\w-]+)['"]\]\s*=\s*\{/);

            if (match) {
                const jobKey = match[1];
                const blockStart = cursor + match[0].length - 1; // pointing to '{'
                const blockEnd = findBlockEnd(innerContent, blockStart);

                if (blockEnd !== -1) {
                    const jobBody = innerContent.substring(blockStart, blockEnd + 1);
                    jobs[jobKey] = parseJobContent(jobBody);
                    cursor = blockEnd + 1;
                    continue; // Skip the increment at end of loop
                }
            }
        }

        cursor++;
    }

    return jobs;
}

function findEndQuote(str, start, quoteChar) {
    for (let i = start + 1; i < str.length; i++) {
        if (str[i] === quoteChar && str[i - 1] !== '\\') return i;
    }
    return str.length;
}

function findBlockEnd(str, startBraceIdx) {
    let depth = 0;
    let inString = false;
    let stringChar = null;

    for (let i = startBraceIdx; i < str.length; i++) {
        const char = str[i];

        if (!inString && str.substring(i, i + 2) === '--') {
            const endLine = str.indexOf('\n', i + 2);
            i = endLine === -1 ? str.length : endLine;
            continue;
        }

        if ((char === '"' || char === "'") && str[i - 1] !== '\\') {
            if (!inString) {
                inString = true;
                stringChar = char;
            } else if (char === stringChar) {
                inString = false;
                stringChar = null;
            }
        }
        if (inString) continue;

        if (char === '{') depth++;
        if (char === '}') {
            depth--;
            if (depth === 0) return i;
        }
    }
    return -1;
}

export function parseConfigLua(luaContent) {
    const config = JSON.parse(JSON.stringify(defaultConfig));

    // JobsRaw Extraction (Legacy)
    const jobsStart = luaContent.indexOf('Config.Jobs = ');
    if (jobsStart !== -1) {
        let openBraces = 0;
        let endIndex = -1;
        let foundStart = false;

        const startSearch = luaContent.indexOf('{', jobsStart);

        for (let i = startSearch; i < luaContent.length; i++) {
            if (luaContent[i] === '{') {
                openBraces++;
                foundStart = true;
            } else if (luaContent[i] === '}') {
                openBraces--;
            }

            if (foundStart && openBraces === 0) {
                endIndex = i + 1;
                break;
            }
        }

        if (endIndex !== -1) {
            config.JobsRaw = luaContent.substring(jobsStart + 'Config.Jobs = '.length, endIndex);
        }
    }

    // Structured Parsing
    // Structured Parsing
    const parsedJobs = parseJobs(luaContent);
    if (Object.keys(parsedJobs).length > 0) {
        config.Jobs = parsedJobs;
    }

    // --- General (parametres) + Staff/Admin (regroupé ou legacy) ---
    const drawDist = luaContent.match(/Config\.DrawDistance\s*=\s*([\d.]+)/);
    const debugMatch = luaContent.match(/Config\.Debug\s*=\s*(true|false)/);
    const oxTargetMatch = luaContent.match(/Config\.UseOxTarget\s*=\s*(true|false)/);
    let staffGroups = [];
    let adminFromBlock = null;

    const staffAndAdminBlock = extractBlockContent(luaContent, 'Config.StaffAndAdmin');
    if (staffAndAdminBlock) {
        const staffGroupsBlock = extractBlockContent(staffAndAdminBlock, 'staffGroups');
        if (staffGroupsBlock) {
            const double = staffGroupsBlock.match(/"([^"]+)"/g);
            const single = staffGroupsBlock.match(/'([^']*)'/g);
            if (double) staffGroups = double.map(s => s.replace(/"/g, ''));
            else if (single) staffGroups = single.map(s => s.replace(/'/g, ''));
        }
        const adminBlockInner = extractBlockContent(staffAndAdminBlock, 'admin');
        if (adminBlockInner) {
            const parseBool = (b, k) => parseBoolFromBlock(b, k);
            const parseStr = (b, k) => parseStrFromBlock(b, k);
            adminFromBlock = {
                menu: { enabled: parseBool(adminBlockInner, 'enabled'), command: parseStr(adminBlockInner, 'command') || 'jobadmin' }
            };
        }
    }
    if (!staffGroups.length) {
        const staffGroupsMatch = extractBlockContent(luaContent, 'Config.StaffGroups');
        if (staffGroupsMatch) {
            const double = staffGroupsMatch.match(/"([^"]+)"/g);
            const single = staffGroupsMatch.match(/'([^']*)'/g);
            if (double) staffGroups = double.map(s => s.replace(/"/g, ''));
            else if (single) staffGroups = single.map(s => s.replace(/'/g, ''));
        }
    }
    config.General = {
        parametres: {
            DrawDistance: drawDist ? parseFloat(drawDist[1]) : config.General.parametres.DrawDistance,
            Debug: debugMatch ? debugMatch[1] === 'true' : config.General.parametres.Debug,
            UseOxTarget: oxTargetMatch ? oxTargetMatch[1] === 'true' : config.General.parametres.UseOxTarget
        },
        staff: { groups: staffGroups.length ? staffGroups : config.General.staff.groups }
    };
    if (adminFromBlock) config.Admin = adminFromBlock;

    // --- Notifications (format éditeur : activation / evenements ; rétrocompat ancien format plat) ---
    const notifBlock = extractBlockContent(luaContent, 'Config.Notifications');
    if (notifBlock) {
        const flat = {};
        ['enabled', 'sound', 'gradeChange', 'promotion', 'demotion', 'fire', 'recruit'].forEach(k => { flat[k] = parseBoolFromBlock(notifBlock, k); });
        flat.duration = parseIntFromBlock(notifBlock, 'duration');
        config.Notifications = {
            activation: { enabled: flat.enabled, sound: flat.sound, duration: flat.duration },
            evenements: { gradeChange: flat.gradeChange, promotion: flat.promotion, demotion: flat.demotion, fire: flat.fire, recruit: flat.recruit }
        };
    }

    // --- Editor (schéma UI/UX : le config pilote l'interface) ---
    const editorJsonMatch = luaContent.match(/Config\.EditorJson\s*=\s*"((?:[^"\\]|\\.)*)"/);
    if (editorJsonMatch) {
        try {
            const decoded = editorJsonMatch[1]
                .replace(/\\n/g, '\n')
                .replace(/\\\\/g, '\\')
                .replace(/\\"/g, '"');
            config.Editor = JSON.parse(decoded);
        } catch (_) { /* garder defaultConfig.Editor */ }
    }

    // --- Admin (format éditeur : menu uniquement ; rétrocompat si pas déjà défini par StaffAndAdmin) ---
    if (!config.Admin || !config.Admin.menu) {
        const adminBlock = extractBlockContent(luaContent, 'Config.Admin');
        if (adminBlock) {
            config.Admin = {
                menu: {
                    enabled: parseBoolFromBlock(adminBlock, 'enabled'),
                    command: parseStrFromBlock(adminBlock, 'command') || 'tspd_admin'
                }
            };
        }
    }

    return config;
}

export function parseJobsBlock(rawContent) {
    if (!rawContent) return {};
    // Ensure it looks like a lua table
    if (!rawContent.trim().startsWith('{')) return {};

    // We wrap it to reuse the existing parsing logic which expects "Config.Jobs = {...}"
    // or we can reuse `parseJobs` logic if we adapt it.
    // The current parseJobs extracts via `extractBlockContent(..., 'Config.Jobs')`.
    // So we need to wrap it.
    const wrapped = "Config.Jobs = " + rawContent;
    return parseJobs(wrapped);
}
