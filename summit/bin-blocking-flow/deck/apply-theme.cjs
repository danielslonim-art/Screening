// pptxgenjs writes Office's stock colour scheme into the theme, so scheme colours would render
// as Office blue/orange. This rewrites ppt/theme/theme1.xml with the deck's own colours and name.
const fs = require('node:fs');
const JSZip = require(require.resolve('jszip', { paths: [require.resolve('pptxgenjs')] }));

const SLOTS = ['dk1', 'lt1', 'dk2', 'lt2', 'accent1', 'accent2', 'accent3', 'accent4', 'accent5', 'accent6', 'hlink', 'folHlink'];

async function applyTheme(file, { name, colors }) {
  for (const k of SLOTS) if (!/^[0-9A-F]{6}$/i.test(colors[k] || '')) throw new Error(`theme colour ${k} must be 6 hex digits`);
  const zip = await JSZip.loadAsync(fs.readFileSync(file));
  const part = 'ppt/theme/theme1.xml';
  const scheme = `<a:clrScheme name="${name}">` + SLOTS.map(k => `<a:${k}><a:srgbClr val="${colors[k].toUpperCase()}"/></a:${k}>`).join('') + '</a:clrScheme>';
  const xml = (await zip.file(part).async('string'))
    .replace(/<a:clrScheme\b[\s\S]*?<\/a:clrScheme>/, () => scheme)
    .replace(/(<a:(?:theme|fontScheme)\b[^>]*?\bname=")[^"]*"/g, (_, head) => `${head}${name}"`);
  zip.file(part, xml);
  // A scheme colour passed to a hex-only option comes out as an invalid srgbClr; fail loudly.
  for (const f of Object.keys(zip.files).filter(f => f.endsWith('.xml'))) {
    const bad = (await zip.file(f).async('string')).match(/<a:srgbClr val="((?![0-9A-Fa-f]{6}")[^"]*)"/);
    if (bad) throw new Error(`${f}: srgbClr "${bad[1]}" is not hex; a scheme colour went to a hex-only option`);
  }
  fs.writeFileSync(file, await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' }));
}

module.exports = { applyTheme };
