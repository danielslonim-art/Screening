// Global Screening presentation template: theme, layout names and layout definitions.
// Shared by build-template.cjs (the .potx and guide deck) and any deck built on the template,
// so a deck's layouts are always identical to the template's. No dependencies: callers pass in
// their own pptxgenjs instance.
const path = require('node:path');

const SHIELD = path.join(__dirname, 'assets', 'check-shield.png');

// Six-digit hex only. To rebrand, change these and rebuild; everything else uses theme slots.
const HEX = {
  ink: '0B1526', white: 'FFFFFF', muted: '55617A', canvas: 'F2F4F8',
  indigo: '3446D4', red: 'C8261B', green: '12805A', amber: 'B45309', slate: '8B95A8', line: 'D3D9E3',
};
const THEME = {
  name: 'Global Screening',
  headFontFace: 'Arial',
  bodyFontFace: 'Arial',
  colors: {
    dk1: HEX.ink, lt1: HEX.white, dk2: HEX.muted, lt2: HEX.canvas,
    accent1: HEX.indigo, accent2: HEX.red, accent3: HEX.green, accent4: HEX.amber,
    accent5: HEX.slate, accent6: HEX.line, hlink: HEX.indigo, folHlink: HEX.muted,
  },
};

// Layout names as they appear in PowerPoint's New Slide menu, in menu order.
const L = {
  TITLE: 'Title',
  SECTION: 'Section divider',
  CONTENT: 'Title and content',
  TWO: 'Two content',
  CALLOUT: 'Content with key point',
  NUMBERS: 'Key numbers',
  TITLE_ONLY: 'Title only',
  TITLE_ONLY_DARK: 'Title only, dark',
  STATEMENT: 'Statement',
  PICTURE: 'Picture with caption',
  CLOSING: 'Closing',
  BLANK: 'Blank',
};

// Geometry shared with decks (inches, 13.333 x 7.5 slide).
const G = {
  W: 13.333, H: 7.5, M: 0.6,
  contentTop: 1.75, contentBottom: 6.6,
  // The checkpoint line on the Title and Closing layouts: a payment travelling left to right,
  // stopped at the red check. Decks can label the nodes at these x positions.
  motif: { y: 5.85, nodes: [1.0, 4.2, 8.4, 12.1], check: 6.05 },
};

function defineLayouts(pres, { footer = 'Checkout.com · Global Screening' } = {}) {
  const C = pres.SchemeColor;
  const INK = C.text1, MUTED = C.text2, WHITE = C.background1, CANVAS = C.background2;
  const INDIGO = C.accent1, RED = C.accent2, SLATE = C.accent5, LINE = C.accent6;
  const S = pres.shapes;
  const font = THEME.headFontFace;

  // objectName is what PowerPoint's Selection Pane shows; finish.cjs also reads it (see there).
  const ph = (name, type, x, y, w, h, prompt, opts = {}) =>
    ({ placeholder: { options: { name, type, x, y, w, h, margin: 0, valign: 'top', align: 'left', fontFace: font,
      objectName: name[0].toUpperCase() + name.slice(1) + ' placeholder', ...opts }, text: prompt } });
  // Layouts only take rect/line/text/image objects; an empty text object carries any shape geometry.
  const shape = (geom, x, y, w, h, color, extra = {}) =>
    ({ text: { text: '', options: { shape: geom, x, y, w, h, fill: { color }, line: { type: 'none' }, ...extra } } });
  const foot = color => [
    { text: { text: footer, options: { x: 6.4, y: 6.9, w: 5.8, h: 0.3, align: 'right', valign: 'middle', margin: 0, fontSize: 10, color } } },
  ];
  const num = color => ({ x: 12.33, y: 6.9, w: 0.4, h: 0.3, fontSize: 10, color, align: 'right', valign: 'middle' });

  // Light content frame: title, a right-hand tag for wayfinding, and a source line.
  const lightFrame = [
    ph('title', 'title', G.M, 0.42, 9.4, 0.95, 'Slide title: say the point, not the topic', { fontSize: 28, bold: true, color: INK }),
    ph('tag', 'body', 10.2, 0.5, 2.53, 0.3, 'PART OR TOPIC', { fontSize: 10, bold: true, color: INDIGO, align: 'right', charSpacing: 1.5 }),
    ph('source', 'body', G.M, 6.9, 5.6, 0.3, 'Source: cite the legislation, guidance, policy section or list entry', { fontSize: 10, color: MUTED, valign: 'middle' }),
    ...foot(MUTED),
  ];
  const bullets = { bullet: { indent: 18 }, paraSpaceAfter: 8, fontSize: 18, color: INK };

  // Checkpoint line motif (dark layouts)
  const motif = () => {
    const { y, nodes, check } = G.motif;
    const objs = [
      { line: { x: nodes[0], y, w: check - nodes[0], h: 0, line: { color: INDIGO, width: 3 } } },
      { line: { x: check, y, w: nodes[3] - check, h: 0, line: { color: SLATE, width: 2, dashType: 'dash' } } },
    ];
    nodes.forEach((x, i) => objs.push(shape(S.OVAL, x - 0.1, y - 0.1, 0.2, 0.2, i < 2 ? INDIGO : SLATE)));
    objs.push(shape(S.OVAL, check - 0.3, y - 0.3, 0.6, 0.6, RED));
    objs.push({ image: { x: check - 0.15, y: y - 0.15, w: 0.3, h: 0.3, path: SHIELD } });
    return objs;
  };

  pres.defineSlideMaster({
    title: L.TITLE, background: { color: INK },
    objects: [
      ph('kicker', 'body', 0.8, 1.55, 9.0, 0.35, 'EVENT, TEAM OR SERIES', { fontSize: 14, bold: true, color: SLATE, charSpacing: 3 }),
      ph('title', 'title', 0.8, 2.0, 9.6, 1.9, 'Presentation title', { fontSize: 46, bold: true, color: WHITE }),
      ph('subtitle', 'body', 0.8, 4.0, 9.6, 0.8, 'One-line subtitle', { fontSize: 20, color: CANVAS }),
      ph('presenter', 'body', 0.8, 6.65, 8.0, 0.35, 'Team or role · date', { fontSize: 12, color: SLATE }),
      ...motif(),
    ],
  });

  pres.defineSlideMaster({
    title: L.SECTION, background: { color: INDIGO },
    objects: [
      ph('number', 'body', 0.8, 1.6, 4.0, 1.5, '01', { fontSize: 88, bold: true, color: WHITE }),
      ph('title', 'title', 0.8, 3.25, 11.0, 1.2, 'Section title', { fontSize: 40, bold: true, color: WHITE }),
      ph('body', 'body', 0.8, 4.55, 9.0, 1.1, 'What this section covers, in a sentence', { fontSize: 18, color: CANVAS }),
      ...foot(CANVAS),
    ],
    slideNumber: num(CANVAS),
  });

  pres.defineSlideMaster({
    title: L.CONTENT, background: { color: WHITE },
    objects: [...lightFrame,
      ph('body', 'body', G.M, G.contentTop, 12.13, 4.85, 'Add points. Press Tab for a second level', bullets)],
    slideNumber: num(MUTED),
  });

  pres.defineSlideMaster({
    title: L.TWO, background: { color: WHITE },
    objects: [...lightFrame,
      ph('headingLeft', 'body', G.M, G.contentTop, 5.9, 0.4, 'Left heading', { fontSize: 16, bold: true, color: INDIGO }),
      ph('left', 'body', G.M, 2.3, 5.9, 4.3, 'Add points', { ...bullets, fontSize: 16 }),
      ph('headingRight', 'body', 6.83, G.contentTop, 5.9, 0.4, 'Right heading', { fontSize: 16, bold: true, color: INDIGO }),
      ph('right', 'body', 6.83, 2.3, 5.9, 4.3, 'Add points', { ...bullets, fontSize: 16 })],
    slideNumber: num(MUTED),
  });

  pres.defineSlideMaster({
    title: L.CALLOUT, background: { color: WHITE },
    objects: [...lightFrame,
      ph('body', 'body', G.M, G.contentTop, 7.5, 4.85, 'Add points', bullets),
      shape(S.ROUNDED_RECTANGLE, 8.55, G.contentTop, 4.18, 4.85, INDIGO, { rectRadius: 0.1, fill: { color: INDIGO, transparency: 90 } }),
      ph('keyLabel', 'body', 8.85, 2.05, 3.6, 0.3, 'KEY POINT', { fontSize: 11, bold: true, color: INDIGO, charSpacing: 2 }),
      ph('key', 'body', 8.85, 2.5, 3.6, 3.8, 'The one thing the audience should remember from this slide', { fontSize: 22, bold: true, color: INK })],
    slideNumber: num(MUTED),
  });

  const cols = [G.M, G.M + 4.11, G.M + 8.22];
  pres.defineSlideMaster({
    title: L.NUMBERS, background: { color: WHITE },
    objects: [...lightFrame,
      ...cols.flatMap((x, i) => [
        { line: { x, y: 2.15, w: 3.91, h: 0, line: { color: LINE, width: 1 } } },
        ph('number' + (i + 1), 'body', x, 2.4, 3.91, 1.2, ['24h', '3', '100%'][i], { fontSize: 54, bold: true, color: INDIGO }),
        ph('label' + (i + 1), 'body', x, 3.75, 3.6, 1.6, 'What the number means, and its source', { fontSize: 15, color: MUTED }),
      ])],
    slideNumber: num(MUTED),
  });

  pres.defineSlideMaster({
    title: L.TITLE_ONLY, background: { color: WHITE },
    objects: lightFrame,
    slideNumber: num(MUTED),
  });

  pres.defineSlideMaster({
    title: L.TITLE_ONLY_DARK, background: { color: INK },
    objects: [
      ph('title', 'title', G.M, 0.6, 9.4, 0.95, 'Slide title', { fontSize: 32, bold: true, color: WHITE }),
      ph('tag', 'body', 10.2, 0.68, 2.53, 0.3, 'PART OR TOPIC', { fontSize: 10, bold: true, color: SLATE, align: 'right', charSpacing: 1.5 }),
      ph('source', 'body', G.M, 6.9, 5.6, 0.3, 'Source: cite the legislation, guidance, policy section or list entry', { fontSize: 10, color: SLATE, valign: 'middle' }),
      ...foot(SLATE)],
    slideNumber: num(SLATE),
  });

  pres.defineSlideMaster({
    title: L.STATEMENT, background: { color: INK },
    objects: [
      shape(S.OVAL, 0.8, 1.62, 0.16, 0.16, RED),
      ph('statement', 'body', 0.8, 2.0, 11.2, 2.5, 'One statement, in one or two lines', { fontSize: 36, bold: true, color: WHITE }),
      ph('attribution', 'body', 0.8, 4.7, 9.0, 0.5, 'Attribution or source', { fontSize: 16, color: SLATE }),
      ...foot(SLATE)],
    slideNumber: num(SLATE),
  });

  pres.defineSlideMaster({
    title: L.PICTURE, background: { color: WHITE },
    objects: [...lightFrame,
      ph('picture', 'pic', G.M, G.contentTop, 7.5, 4.85, 'Insert a picture or screenshot'),
      ph('captionHeading', 'body', 8.55, G.contentTop, 4.18, 0.85, 'Caption heading', { fontSize: 18, bold: true, color: INK }),
      ph('caption', 'body', 8.55, 2.7, 4.18, 3.9, 'What the audience should notice in the picture', { fontSize: 15, color: MUTED })],
    slideNumber: num(MUTED),
  });

  pres.defineSlideMaster({
    title: L.CLOSING, background: { color: INK },
    objects: [
      ph('title', 'title', 0.8, 2.2, 11.0, 1.2, 'Questions', { fontSize: 46, bold: true, color: WHITE }),
      ph('body', 'body', 0.8, 3.6, 9.6, 1.2, 'Contact details or next steps', { fontSize: 18, color: CANVAS }),
      ...motif()],
  });

  pres.defineSlideMaster({ title: L.BLANK, background: { color: WHITE }, objects: [] });
}

// Bulleted text for body placeholders filled from code. pptxgenjs only carries the layout's
// bullet onto the first paragraph, so every paragraph sets its level explicitly.
// items: ['text', ['text', 1], ...] where 1 is the second level.
function bullets(pres, items, { size = 18 } = {}) {
  const C = pres.SchemeColor;
  return items.map((item, i) => {
    const [text, lvl = 0] = Array.isArray(item) ? item : [item];
    return { text, options: {
      bullet: lvl ? { indent: 18, characterCode: '2013' } : { indent: 18 }, indentLevel: lvl,
      fontSize: lvl ? size - 2 : size, color: lvl ? C.text2 : C.text1, paraSpaceAfter: 8, breakLine: i < items.length - 1 } };
  });
}

module.exports = { HEX, THEME, L, G, defineLayouts, bullets };
