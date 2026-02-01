const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'config.lua');
let content = fs.readFileSync(filePath, 'utf8');

function stripLuaComments(str) {
  const lines = str.split('\n');
  const out = [];
  let inBlockComment = false;
  for (let line of lines) {
    const trimmed = line.trim();
    if (inBlockComment) {
      if (trimmed.includes(']]')) inBlockComment = false;
      continue;
    }
    if (trimmed.startsWith('--[[')) {
      inBlockComment = !trimmed.includes(']]');
      continue;
    }
    if (trimmed === '' || trimmed.startsWith('--')) {
      continue;
    }
    let inDbl = false;
    let inSgl = false;
    let i = 0;
    while (i < line.length) {
      const c = line[i];
      if (!inSgl && c === '"' && (i === 0 || line[i - 1] !== '\\')) inDbl = !inDbl;
      else if (!inDbl && c === "'" && (i === 0 || line[i - 1] !== '\\')) inSgl = !inSgl;
      else if (!inDbl && !inSgl && c === '-' && line[i + 1] === '-') {
        line = line.substring(0, i).trimEnd();
        break;
      }
      i++;
    }
    out.push(line);
  }
  return out.join('\n');
}

content = stripLuaComments(content);
fs.writeFileSync(filePath, content);
console.log('Comments stripped from config.lua');
