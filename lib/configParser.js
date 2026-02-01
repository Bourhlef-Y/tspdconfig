
export const defaultConfig = {
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
                vestiaire: { enabled: false, model: "", coords: { x: 0, y: 0, z: 0, w: 0 } }
            },

            vehicles: {
                "[PS] Police Secours": [
                    { label: "BMW R1200 RT", model: "bmr12pn" }
                ]
            }
        }
    }
};

// --- HELPER FUNCTIONS ---

const EXTRACT_REGEX = /\s*(local\s+\w+\s*=\s*)?({[\s\S]*})/;
// Regex pour vector3(x,y,z)
const REGEX_VECTOR3 = /vector3\s*\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)/;
// Regex pour vector4(x,y,z,w)
const REGEX_VECTOR4 = /vector4\s*\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)/;


function extractBlockContent(content, blockName) {
    const startIdx = content.indexOf(blockName + ' = {');
    if (startIdx === -1) return null;

    let openBrackets = 0;
    let foundStart = false;
    let endIdx = -1;

    for (let i = startIdx; i < content.length; i++) {
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

function parseJobContent(jobBody) {
    const job = JSON.parse(JSON.stringify(defaultConfig.Jobs.police)); // Clone default

    // Basic Fields
    const labelMatch = jobBody.match(/label\s*=\s*"(.*)"/);
    if (labelMatch) job.label = labelMatch[1];

    const colorMatch = jobBody.match(/color\s*=\s*"(.*)"/);
    if (colorMatch) job.color = colorMatch[1];

    const whiteListMatch = jobBody.match(/whitelisted\s*=\s*(true|false)/);
    if (whiteListMatch) job.whitelisted = whiteListMatch[1] === 'true';

    // Locations
    ['recruiterPoint', 'bossPoint', 'accueil', 'vestiaire', 'armurerie', 'heliPoint', 'boatPoint'].forEach(pt => {
        const regex = new RegExp(`${pt}\\s*=\\s*(vector[34]\\([^)]+\\))`);
        const match = jobBody.match(regex);
        if (match) {
            const vec = parseVector(match[1]);
            if (vec) job[pt] = vec;
        }
    });

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
    const config = { ...defaultConfig };

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
    const parsedJobs = parseJobs(luaContent);
    if (Object.keys(parsedJobs).length > 0) {
        config.Jobs = parsedJobs;
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
