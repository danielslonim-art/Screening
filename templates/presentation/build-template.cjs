// Builds the Global Screening presentation template and its guide deck:
//   npm install && npm run build
// Outputs: global-screening-template.potx (layouts and theme, one starter slide)
//          template-guide.pptx (one worked example per layout, with notes)
const path = require('node:path');
const pptxgen = require('pptxgenjs');
const JSZip = require(require.resolve('jszip', { paths: [require.resolve('pptxgenjs')] }));
const { THEME, HEX, L, G, defineLayouts, bullets: bulletRuns } = require('./layouts.cjs');
const { finish } = require('./finish.cjs')(JSZip);

const OUT = __dirname;

function newPres(title) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_WIDE';
  pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
  pres.title = title;
  pres.company = 'Checkout.com';
  defineLayouts(pres);
  return pres;
}

async function buildTemplate() {
  const pres = newPres('Global Screening presentation template');
  const s = pres.addSlide({ masterName: L.TITLE });
  // Empty placeholders, so PowerPoint shows each layout prompt on the starter slide.
  for (const name of ['kicker', 'title', 'subtitle', 'presenter']) s.addText('', { placeholder: name });
  const tmp = path.join(OUT, 'template.tmp.pptx');
  await pres.writeFile({ fileName: tmp });
  await finish(tmp, THEME, { out: path.join(OUT, 'global-screening-template.potx'), template: true });
}

async function buildGuide() {
  const pres = newPres('Global Screening template guide');
  const C = pres.SchemeColor;
  const T = (slide, text, opts) => slide.addText(text, { isTextBox: true, margin: 0, valign: 'top', ...opts });
  const add = (layout, fill, notes) => {
    const s = pres.addSlide({ masterName: layout });
    for (const [name, value] of Object.entries(fill)) s.addText(value, { placeholder: name });
    s.addNotes(notes);
    return s;
  };
  const bullets = (items, size) => bulletRuns(pres, items, { size });

  add(L.TITLE, {
    kicker: 'GLOBAL SCREENING', title: 'Presentation template', subtitle: 'Twelve layouts and one theme, and how to use them',
    presenter: 'Global Screening · Checkout.com',
  }, 'Title layout. Use it once, for the opening slide. The checkpoint line at the bottom is part of the layout.');

  add(L.SECTION, { number: '01', title: 'Using the layouts', body: 'Pick a layout from Home → New Slide, then type into the prompts.' },
    'Section divider. Use one per part of a longer talk; skip it for talks under ten minutes.');

  add(L.CONTENT, {
    tag: 'WRITING SLIDES', title: 'Make the title the point you want remembered',
    body: bullets([
      ['Lead with the conclusion, then give the evidence'],
      ['One idea per slide; split any slide that needs two'],
      ['Body text is 18pt and second-level text 16pt', 1],
      ['Never go below 11pt on a slide that will be projected', 1],
      ['Put every source on the source line, not in the body'],
    ]),
    source: 'Source lines take the legislation, regulator guidance, policy section or list entry relied on',
  }, 'Title and content. Body text is bulleted; press Tab for a second level. Keep to five or six points.');

  add(L.TWO, {
    tag: 'CHOOSING A LAYOUT', title: 'Use two columns to compare, not to fit more in',
    headingLeft: 'Good uses', left: bullets([['Before and after'], ['Two regimes or two options'], ['What we do and what we don\'t']], 16),
    headingRight: 'Poor uses', right: bullets([['Overflow from a full slide'], ['Two unrelated lists'], ['Anything a table would show better']], 16),
    source: 'Source: add one if the columns make claims',
  }, 'Two content. Each column has a heading and bulleted body.');

  add(L.CALLOUT, {
    tag: 'CHOOSING A LAYOUT', title: 'Pair the detail with the one thing to remember',
    body: bullets([['Explain or evidence the point on the left'], ['Keep the key point to one sentence'], ['Use it at most once or twice per talk']]),
    keyLabel: 'KEY POINT', key: 'If the room remembers one sentence from this slide, it should be this one.',
    source: 'Source: add one if the key point is a claim',
  }, 'Content with key point. The tinted panel is part of the layout.');

  add(L.NUMBERS, {
    tag: 'THE TEMPLATE', title: 'Show up to three numbers, each with its meaning',
    number1: '12', label1: 'Layouts in the New Slide menu',
    number2: '18pt', label2: 'Body text on content slides',
    number3: '1', label3: 'Theme to change when rebranding',
    source: 'Source: every number on a real slide needs one',
  }, 'Key numbers. Three columns of number and label; leave a column empty if you only have two.');

  {
    const s = add(L.TITLE_ONLY, { tag: 'COLOUR AND TYPE', title: 'Colour carries meaning, so use it the same way every time',
      source: 'Fonts: Arial throughout, so slides look the same on every machine' },
      'Title only, used here for the colour rules. Red, green and amber are reserved for these meanings.');
    const sw = [
      [HEX.ink, 'Ink', 'Text, dark backgrounds, our own system', 'text1'],
      [HEX.indigo, 'Indigo', 'Emphasis, numbers, section dividers', 'accent1'],
      [HEX.red, 'Red', 'Blocked, declined, a breach or a hard stop', 'accent2'],
      [HEX.green, 'Green', 'Proceeds, passed, no match', 'accent3'],
      [HEX.amber, 'Amber', 'A named human decides here', 'accent4'],
      [HEX.slate, 'Slate', 'Connectors, secondary text on dark', 'accent5'],
    ];
    sw.forEach(([hex, name, use, slot], i) => {
      const x = G.M + (i % 3) * 4.11, y = G.contentTop + Math.floor(i / 3) * 2.45;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: 0.9, h: 0.9, rectRadius: 0.1, fill: { color: C[slot] }, line: { type: 'none' } });
      T(s, name, { x: x + 1.15, y: y + 0.02, w: 2.7, h: 0.35, fontSize: 16, bold: true, color: C.text1 });
      T(s, `#${hex} · theme ${slot}`, { x: x + 1.15, y: y + 0.4, w: 2.7, h: 0.3, fontSize: 11, color: C.text2 });
      T(s, use, { x, y: y + 1.1, w: 3.8, h: 0.8, fontSize: 14, color: C.text1 });
    });
  }

  {
    const s = add(L.TITLE_ONLY, { tag: 'BUILDING DIAGRAMS', title: 'Build diagrams on the title-only layout, inside the content area',
      source: 'Content area: 0.6 in side margins, 1.75 in to 6.6 in from the top' },
      'Title only. Use it for any custom diagram or flow. Keep content inside the dashed area so it clears the title and source line.');
    s.addShape(pres.shapes.RECTANGLE, { x: G.M, y: G.contentTop, w: G.W - 2 * G.M, h: G.contentBottom - G.contentTop,
      fill: { color: C.background2 }, line: { color: C.accent5, width: 1, dashType: 'dash' } });
    const steps = ['Input', 'Check', 'Decision', 'Outcome'];
    steps.forEach((t, i) => {
      const x = 1.2 + i * 2.9;
      s.addText(t, { shape: pres.shapes.ROUNDED_RECTANGLE, rectRadius: 0.1, x, y: 3.55, w: 2.3, h: 1.0,
        fill: { color: i === 1 ? C.accent2 : C.background1 }, line: { color: C.accent6, width: 1 },
        fontSize: 16, bold: true, color: i === 1 ? C.background1 : C.text1, align: 'center', valign: 'middle', margin: 0 });
      if (i < 3) s.addShape(pres.shapes.LINE, { x: x + 2.35, y: 4.05, w: 0.5, h: 0, line: { color: C.accent5, width: 2, endArrowType: 'triangle' } });
    });
  }

  {
    const s = add(L.TITLE_ONLY_DARK, { tag: 'CLOSING A TALK', title: 'End on three things to take away', source: 'Source: add one if the takeaways make claims' },
      'Title only, dark. Good for takeaways before the closing slide.');
    ['Say the point', 'Show the evidence', 'Name who decides'].forEach((t, i) => {
      const x = G.M + i * 4.11;
      T(s, String(i + 1).padStart(2, '0'), { x, y: 2.4, w: 1.5, h: 0.9, fontSize: 48, bold: true, color: C.accent1 });
      s.addShape(pres.shapes.LINE, { x, y: 3.45, w: 3.91, h: 0, line: { color: C.accent5, width: 1 } });
      T(s, t, { x, y: 3.7, w: 3.9, h: 0.45, fontSize: 20, bold: true, color: C.background1 });
    });
  }

  add(L.STATEMENT, { statement: 'Say one thing, in one or two lines, and let it land.', attribution: 'Use for a principle, a quote or a turning point in the talk' },
    'Statement. One sentence only. The red dot is part of the layout.');

  add(L.PICTURE, { title: 'Show a screenshot or diagram with what to notice', tag: 'PICTURES',
    captionHeading: 'Insert a picture in the box on the left', caption: 'Then say here what the audience should notice. Crop screenshots to the part that matters.',
    source: 'Source: credit the image if it is not ours' },
    'Picture with caption. The picture box is empty on purpose: click its icon to insert an image.')
    .addText('', { placeholder: 'picture' });

  add(L.CLOSING, { title: 'Questions', body: 'Global Screening · Checkout.com' },
    'Closing. Add contact details or next steps in the second line.');

  {
    const s = pres.addSlide({ masterName: L.BLANK });
    T(s, 'Blank: for full-bleed images and anything that needs the whole slide', { x: G.M, y: 3.4, w: 12.13, h: 0.6, fontSize: 24, bold: true, color: C.text2, align: 'center', valign: 'middle' });
    s.addNotes('Blank. No title, footer or slide number. Use it for a full-bleed image such as a one-page handout.');
  }

  const tmp = path.join(OUT, 'guide.tmp.pptx');
  await pres.writeFile({ fileName: tmp });
  await finish(tmp, THEME, { out: path.join(OUT, 'template-guide.pptx') });
}

(async () => {
  await buildTemplate();
  await buildGuide();
  console.log('Wrote global-screening-template.potx and template-guide.pptx');
})();
