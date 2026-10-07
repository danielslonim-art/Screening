// Post-processing for decks and templates built with pptxgenjs on the Global Screening layouts.
// pptxgenjs can't write theme colours, master text styles or placeholder insets, and it adds an
// unnamed DEFAULT layout. This fixes all four and, for a template, saves the file as a .potx.
// JSZip is passed in (it ships with pptxgenjs) so this file has no install of its own.
const fs = require('node:fs');

const SLOTS = ['dk1', 'lt1', 'dk2', 'lt2', 'accent1', 'accent2', 'accent3', 'accent4', 'accent5', 'accent6', 'hlink', 'folHlink'];

// Master text styles: what a new text box or an un-styled placeholder level falls back to.
function txStyles() {
  const run = (sz, clr, bold = false, face = 'mn') =>
    `<a:defRPr sz="${sz}"${bold ? ' b="1"' : ''} kern="1200"><a:solidFill><a:schemeClr val="${clr}"/></a:solidFill>` +
    `<a:latin typeface="+${face}-lt"/><a:ea typeface="+${face}-ea"/><a:cs typeface="+${face}-cs"/></a:defRPr>`;
  const lvl = (n, marL, char, sz, clr) =>
    `<a:lvl${n}pPr marL="${marL}" indent="-228600" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1">` +
    `<a:lnSpc><a:spcPct val="100000"/></a:lnSpc><a:spcBef><a:spcPts val="0"/></a:spcBef><a:spcAft><a:spcPts val="600"/></a:spcAft>` +
    `<a:buFont typeface="Arial"/><a:buChar char="${char}"/>${run(sz, clr)}</a:lvl${n}pPr>`;
  const levels = [[228600, '•', 1800, 'tx1'], [457200, '–', 1600, 'tx2'], [685800, '•', 1400, 'tx2']];
  for (let n = 4; n <= 9; n++) levels.push([685800 + (n - 3) * 228600, '–', 1400, 'tx2']);
  const other = [...Array(9)].map((_, i) =>
    `<a:lvl${i + 1}pPr marL="${i * 457200}" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1">${run(1800, 'tx1')}</a:lvl${i + 1}pPr>`).join('');
  return '<p:txStyles>' +
    '<p:titleStyle><a:lvl1pPr algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1">' +
    `<a:lnSpc><a:spcPct val="95000"/></a:lnSpc><a:spcBef><a:spcPct val="0"/></a:spcBef><a:buNone/>${run(2800, 'tx1', true, 'mj')}</a:lvl1pPr></p:titleStyle>` +
    '<p:bodyStyle>' + levels.map(([m, c, sz, clr], i) => lvl(i + 1, m, c, sz, clr)).join('') + '</p:bodyStyle>' +
    `<p:otherStyle><a:defPPr><a:defRPr lang="en-GB"/></a:defPPr>${other}</p:otherStyle>` +
    '</p:txStyles>';
}

module.exports = JSZip => {
  async function finish(file, theme, { out = file, template = false } = {}) {
    for (const k of SLOTS) if (!/^[0-9A-F]{6}$/i.test(theme.colors[k] || '')) throw new Error(`theme colour ${k} must be six hex digits`);
    const zip = await JSZip.loadAsync(fs.readFileSync(file));
    const read = p => zip.file(p).async('string');

    // 1. Theme colours and name
    const scheme = `<a:clrScheme name="${theme.name}">` + SLOTS.map(k => `<a:${k}><a:srgbClr val="${theme.colors[k].toUpperCase()}"/></a:${k}>`).join('') + '</a:clrScheme>';
    zip.file('ppt/theme/theme1.xml', (await read('ppt/theme/theme1.xml'))
      .replace(/<a:clrScheme\b[\s\S]*?<\/a:clrScheme>/, () => scheme)
      .replace(/(<a:(?:theme|fontScheme)\b[^>]*?\bname=")[^"]*"/g, (_, head) => `${head}${theme.name}"`));

    // 2. Master text styles
    const masterPath = 'ppt/slideMasters/slideMaster1.xml';
    let master = (await read(masterPath)).replace(/<p:txStyles>[\s\S]*?<\/p:txStyles>/, () => txStyles());

    // 3. Drop pptxgenjs's unnamed DEFAULT layout
    const layouts = Object.keys(zip.files).filter(f => /^ppt\/slideLayouts\/slideLayout\d+\.xml$/.test(f));
    for (const f of layouts) {
      if (!(await read(f)).includes('<p:cSld name="DEFAULT"')) continue;
      const base = f.split('/').pop();
      for (const s of Object.keys(zip.files).filter(p => /^ppt\/slides\/_rels\/.+\.rels$/.test(p)))
        if ((await read(s)).includes(`slideLayouts/${base}"`)) throw new Error(`${s} uses the DEFAULT layout; give that slide a masterName`);
      const relsPath = 'ppt/slideMasters/_rels/slideMaster1.xml.rels';
      const rels = await read(relsPath);
      const rel = rels.match(new RegExp(`<Relationship [^>]*Id="(rId\\d+)"[^>]*Target="../slideLayouts/${base}"[^>]*/>`))
        || rels.match(new RegExp(`<Relationship [^>]*Target="../slideLayouts/${base}"[^>]*Id="(rId\\d+)"[^>]*/>`));
      zip.file(relsPath, rels.replace(rel[0], ''));
      master = master.replace(new RegExp(`<p:sldLayoutId [^>]*r:id="${rel[1]}"\\s*/>`), '');
      zip.file('[Content_Types].xml', (await read('[Content_Types].xml')).replace(new RegExp(`<Override PartName="/ppt/slideLayouts/${base}"[^>]*/>`), ''));
      zip.remove(f);
      zip.remove(`ppt/slideLayouts/_rels/${base}.rels`);
    }
    zip.file(masterPath, master);

    // 4. Layout placeholders: zero insets, top-anchored (source lines centred), like the slides
    for (const f of Object.keys(zip.files).filter(p => /^ppt\/slideLayouts\/slideLayout\d+\.xml$/.test(p))) {
      const xml = (await read(f)).replace(/(<p:cNvPr [^>]*name="([^"]*)"(?:(?!<p:cNvPr )[\s\S])*?)<a:bodyPr wrap="square" rtlCol="0"><\/a:bodyPr>/g, (_, head, name) =>
        `${head}<a:bodyPr wrap="square" lIns="0" tIns="0" rIns="0" bIns="0" rtlCol="0" anchor="${name.startsWith('Source') ? 'ctr' : 't'}"></a:bodyPr>`);
      zip.file(f, xml);
    }

    // 5. A scheme colour passed to a hex-only option comes out as an invalid srgbClr: fail loudly
    for (const f of Object.keys(zip.files).filter(p => p.endsWith('.xml'))) {
      const bad = (await read(f)).match(/<a:srgbClr val="((?![0-9A-Fa-f]{6}")[^"]*)"/);
      if (bad) throw new Error(`${f}: srgbClr "${bad[1]}" is not hex; a scheme colour went to a hex-only option`);
    }

    // 6. Template: mark the package as a .potx
    if (template) {
      zip.file('[Content_Types].xml', (await read('[Content_Types].xml'))
        .replace('presentationml.presentation.main+xml', 'presentationml.template.main+xml'));
    }
    fs.writeFileSync(out, await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' }));
    if (out !== file) fs.unlinkSync(file);
  }
  return { finish };
};
