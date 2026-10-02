// Builds the summit deck: node build-deck.cjs
// Needs: pptxgenjs, react, react-dom, react-icons, sharp (see package.json).
// Scope is card BIN blocking only (Processing-In acquiring and Processing-Out payouts to card).
// Every slide's content is sourced to the BIN sections of the sanctioned bank blocking framework;
// section references are on each slide's source line and in ../README.md.
const path = require('node:path');
const pptxgen = require('pptxgenjs');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const sharp = require('sharp');
const Fa = require('react-icons/fa6');
const { applyTheme } = require('./apply-theme.cjs');

const OUT = path.join(__dirname, 'bin-blocking-summit-deck.pptx');
const HANDOUT = path.join(__dirname, '..', 'bin-blocking-process-flow.png');
const SRC = 'Blocking framework';

// ---------- Theme ----------
const HEX = {
  ink: '0B1526', white: 'FFFFFF', muted: '55617A', canvas: 'F2F4F8',
  indigo: '3446D4', red: 'C8261B', green: '12805A', amber: 'B45309', slate: '8B95A8', line: 'D3D9E3',
};
const THEME = {
  name: 'BIN blocking summit',
  headFontFace: 'Arial',
  bodyFontFace: 'Arial',
  colors: {
    dk1: HEX.ink, lt1: HEX.white, dk2: HEX.muted, lt2: HEX.canvas,
    accent1: HEX.indigo, accent2: HEX.red, accent3: HEX.green, accent4: HEX.amber,
    accent5: HEX.slate, accent6: HEX.line, hlink: HEX.indigo, folHlink: HEX.muted,
  },
};

const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE';            // 13.333 x 7.5 in
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
pres.title = 'Stopping sanctioned banks at the point of payment';
pres.subject = 'Sanctioned bank BIN blocking: process flow';
pres.company = 'Checkout.com';
const C = pres.SchemeColor;
const INK = C.text1, MUTED = C.text2, WHITE = C.background1, CANVAS = C.background2;
const INDIGO = C.accent1, RED = C.accent2, GREEN = C.accent3, AMBER = C.accent4, SLATE = C.accent5, LINE = C.accent6;
const S = pres.shapes;

// ---------- Icons ----------
async function icon(name, hex, size = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(Fa[name], { color: '#' + hex, size }));
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return 'image/png;base64,' + buf.toString('base64');
}

// ---------- Layouts ----------
const footer = color => ({ text: { text: 'Checkout.com Global Screening · Draft for Compliance sign-off',
  options: { x: 7.2, y: 7.0, w: 5.0, h: 0.3, align: 'right', margin: 0, fontSize: 10, color } } });
const titlePh = (color, y, size) => ({ placeholder: { options: { name: 'title', type: 'title', x: 0.6, y, w: 8.0, h: 0.95,
  fontSize: size, bold: true, color, align: 'left', valign: 'top', margin: 0, fontFace: THEME.headFontFace }, text: '' } });

pres.defineSlideMaster({ title: 'COVER', background: { color: INK }, objects: [] });
pres.defineSlideMaster({
  title: 'CONTENT', background: { color: WHITE },
  objects: [footer(MUTED), titlePh(INK, 0.42, 28)],
  slideNumber: { x: 12.33, y: 7.0, w: 0.4, h: 0.3, fontSize: 10, color: MUTED, align: 'right' },
});
pres.defineSlideMaster({
  title: 'DARK', background: { color: INK },
  objects: [footer(SLATE), titlePh(WHITE, 0.6, 32)],
  slideNumber: { x: 12.33, y: 7.0, w: 0.4, h: 0.3, fontSize: 10, color: SLATE, align: 'right' },
});

// ---------- Helpers ----------
const T = (slide, text, opts) => slide.addText(text, { isTextBox: true, margin: 0, valign: 'top', ...opts });
const source = (slide, refs, dark = false) =>
  T(slide, `Source: ${SRC} ${refs}`, { x: 0.6, y: 7.0, w: 6.4, h: 0.3, fontSize: 10, color: dark ? SLATE : MUTED });
// Straight connector; arrowhead at (x2,y2) unless head === false.
function line(slide, x1, y1, x2, y2, { color = SLATE, width = 1.75, dash, head = true } = {}) {
  slide.addShape(S.LINE, {
    x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.abs(x2 - x1), h: Math.abs(y2 - y1),
    flipH: x2 < x1, flipV: y2 < y1,
    line: { color, width, dashType: dash ? 'dash' : 'solid', endArrowType: head ? 'triangle' : 'none' },
  });
}
// Orthogonal polyline through points; arrowhead on the last segment only.
function polyline(slide, pts, opts = {}) {
  for (let i = 0; i < pts.length - 1; i++) {
    line(slide, pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], { ...opts, head: opts.head !== false && i === pts.length - 2 });
  }
}
function card(slide, x, y, w, h, { fill = WHITE, transparency, border = LINE, radius = 0.1, shadow = false, name } = {}) {
  slide.addShape(S.ROUNDED_RECTANGLE, {
    x, y, w, h, rectRadius: radius, objectName: name,
    fill: transparency != null ? { color: fill, transparency } : { color: fill },
    line: border ? { color: border, width: 1 } : { type: 'none' },
    shadow: shadow ? { type: 'outer', color: HEX.ink, opacity: 0.12, blur: 8, offset: 2, angle: 90 } : undefined,
  });
}
function disc(slide, x, y, d, label, { fill = INK, color = WHITE, size = 14 } = {}) {
  slide.addText(label, { shape: S.OVAL, x, y, w: d, h: d, fill: { color: fill }, line: { type: 'none' },
    fontSize: size, bold: true, color, align: 'center', valign: 'middle', margin: 0 });
}
function iconDisc(slide, data, x, y, d, { fill = INDIGO, transparency = 88 } = {}) {
  slide.addShape(S.OVAL, { x, y, w: d, h: d, fill: { color: fill, transparency }, line: { type: 'none' } });
  const p = d * 0.25;
  slide.addImage({ data, x: x + p, y: y + p, w: d - 2 * p, h: d - 2 * p });
}
// Part tracker motif (top right of the three "how it works" slides)
function tracker(slide, active) {
  const parts = [['The list', 1.2], ['Every payment', 1.45], ['Who owns it', 1.3]];
  let x = 12.73 - parts.reduce((a, [, w]) => a + w, 0) - 0.16;
  parts.forEach(([p, w], i) => {
    const on = i + 1 === active;
    slide.addText([{ text: `${i + 1}  `, options: { bold: true } }, { text: p }], {
      shape: S.ROUNDED_RECTANGLE, rectRadius: 0.16, x, y: 0.48, w, h: 0.34,
      fill: { color: on ? INK : CANVAS }, line: { type: 'none' }, fontSize: 11, color: on ? WHITE : MUTED,
      align: 'center', valign: 'middle', margin: 0,
    });
    x += w + 0.08;
  });
}
function outcome(slide, kind, text, x, y, w, h) {
  const [col, glyph] = kind === 'block' ? [RED, '✕'] : [GREEN, '✓'];
  card(slide, x, y, w, h, { fill: col, transparency: 90, border: null, radius: 0.08 });
  disc(slide, x + 0.16, y + (h - 0.34) / 2, 0.34, glyph, { fill: col, size: 13 });
  T(slide, text, { x: x + 0.66, y, w: w - 0.76, h, valign: 'middle', fontSize: 16, bold: true, color: col });
}
// Dark banner: rounded shape plus a separate, inset text box.
function banner(slide, x, y, w, h, runs, fontSize = 13) {
  card(slide, x, y, w, h, { fill: INK, border: null });
  T(slide, runs, { x: x + 0.25, y, w: w - 0.5, h, valign: 'middle', fontSize });
}

(async () => {
  const I = {
    store: await icon('FaStore', HEX.ink), bank: await icon('FaBuildingColumns', HEX.red),
    network: await icon('FaNetworkWired', HEX.ink), shieldW: await icon('FaShieldHalved', HEX.white),
    card: await icon('FaCreditCard', HEX.indigo), payout: await icon('FaMoneyBillTransfer', HEX.indigo),
    route: await icon('FaRoute', HEX.indigo), bolt: await icon('FaBolt', HEX.red),
    font: await icon('FaFont', HEX.indigo), hash: await icon('FaHashtag', HEX.indigo),
    hourglass: await icon('FaHourglassHalf', HEX.indigo), sitemap: await icon('FaSitemap', HEX.indigo),
    cardInk: await icon('FaCreditCard', HEX.ink), payoutInk: await icon('FaMoneyBillTransfer', HEX.ink),
    userCheck: await icon('FaUserCheck', HEX.amber),
  };

  // =====================================================================
  // 1. Cover
  // =====================================================================
  pres.addSection({ title: 'Opening' });
  {
    const s = pres.addSlide({ masterName: 'COVER', sectionTitle: 'Opening' });
    T(s, 'GLOBAL SCREENING · SANCTIONS CONTROLS', { x: 0.8, y: 1.55, w: 8, h: 0.35, fontSize: 14, bold: true, color: SLATE, charSpacing: 3 });
    T(s, 'Stopping sanctioned banks at the point of payment', { x: 0.8, y: 2.0, w: 9.2, h: 1.9, fontSize: 46, bold: true, color: WHITE, fontFace: THEME.headFontFace });
    T(s, 'How our BIN blocking control works, from designation to declined payment', { x: 0.8, y: 4.0, w: 9.4, h: 0.8, fontSize: 20, color: CANVAS });

    // Motif: the payment chain, stopped at our check
    const y = 5.85;
    const nodes = [[1.0, 'Merchant', true], [4.2, 'Checkout.com', true], [8.4, 'Card scheme', false], [12.1, 'Sanctioned issuer', false]];
    line(s, 1.0, y, 6.05, y, { color: INDIGO, width: 3, head: false });
    line(s, 6.05, y, 12.3, y, { color: SLATE, width: 2, dash: true, head: false });
    nodes.forEach(([nx, label, live]) => {
      s.addShape(S.OVAL, { x: nx - 0.1, y: y - 0.1, w: 0.2, h: 0.2, fill: { color: live ? INDIGO : SLATE }, line: { type: 'none' } });
      T(s, label, { x: nx - 1.0, y: y + 0.22, w: 2.0, h: 0.3, fontSize: 12, color: live ? CANVAS : SLATE, align: 'center' });
    });
    disc(s, 5.75, y - 0.3, 0.6, '', { fill: RED });
    s.addImage({ data: I.shieldW, x: 5.9, y: y - 0.15, w: 0.3, h: 0.3 });
    T(s, 'Blocked here', { x: 5.05, y: y - 0.75, w: 2.0, h: 0.3, fontSize: 12, bold: true, color: 'FFB4AC', align: 'center' });
    s.addNotes([
      'Opening. We are a payment service provider: we process card payments and card payouts for merchants, in real time and at volume.',
      'The question this talk answers: how do we make sure no card payment involving a sanctioned bank gets through, when we never hold a relationship with that bank?',
      'The line at the bottom is the whole talk: the payment stops at our check, before it ever reaches the scheme.',
    ].join('\n\n'));
  }

  // =====================================================================
  // 2. Why we block it ourselves
  // =====================================================================
  {
    const s = pres.addSlide({ masterName: 'CONTENT', sectionTitle: 'Opening' });
    s.addText('We block sanctioned banks ourselves, inside our own payment flow', { placeholder: 'title' });

    const y = 2.05, h = 1.05, w = 2.35, xs = [0.6, 3.85, 7.1, 10.38];
    const nodes = [
      ['Merchant', 'Starts a card payment or payout', I.store],
      ['Checkout.com', 'Processes it and earns the fee', I.shieldW],
      ['Card scheme', 'Acquirers and schemes route it onward', I.network],
      ['Issuing bank', 'Could be sanctioned', I.bank],
    ];
    nodes.forEach(([t, d, ic], i) => {
      const x = xs[i], ours = i === 1, bank = i === 3;
      card(s, x, y, w, h, { fill: ours ? INK : bank ? RED : CANVAS, transparency: bank ? 92 : undefined, border: bank ? RED : null, name: 'chain-' + i });
      s.addImage({ data: ic, x: x + 0.18, y: y + 0.2, w: 0.32, h: 0.32 });
      T(s, t, { x: x + 0.62, y: y + 0.15, w: w - 0.72, h: 0.45, fontSize: 14, bold: true, color: ours ? WHITE : bank ? RED : INK, valign: 'middle' });
      T(s, d, { x: x + 0.62, y: y + 0.6, w: w - 0.72, h: 0.38, fontSize: 11, color: ours ? CANVAS : MUTED });
    });
    line(s, 2.95, y + h / 2, 3.83, y + h / 2);
    line(s, 6.2, y + h / 2, 7.08, y + h / 2);
    line(s, 9.45, y + h / 2, 10.36, y + h / 2, { dash: true });
    disc(s, 6.38, y + h / 2 - 0.26, 0.52, '', { fill: RED });
    s.addImage({ data: I.shieldW, x: 6.51, y: y + h / 2 - 0.13, w: 0.26, h: 0.26 });
    T(s, [{ text: 'The check runs here', options: { bold: true, color: RED, breakLine: true } },
          { text: 'after the issuer BIN is extracted, before anything reaches the scheme', options: { color: INK } }],
      { x: 4.95, y: y + h + 0.2, w: 3.4, h: 0.65, fontSize: 13, align: 'center' });
    T(s, 'We have no direct relationship with the issuing bank', { x: 8.0, y: y - 0.5, w: 4.73, h: 0.35, fontSize: 12, italic: true, color: MUTED, align: 'center' });
    line(s, 8.28, y - 0.12, 12.45, y - 0.12, { color: LINE, width: 1, head: false });

    T(s, 'WHAT WE ARE EXPOSED TO', { x: 0.6, y: 4.2, w: 6, h: 0.3, fontSize: 11, bold: true, color: MUTED, charSpacing: 2 });
    const cards = [
      [I.card, 'Payments from sanctioned issuers', 'Real-time, high-volume card traffic from any bank under sanctions'],
      [I.payout, 'Payouts to sanctioned issuers', 'Card payouts and refunds that would credit a card issued by a sanctioned bank'],
      [I.route, 'Routing we don\'t control', 'Acquirers and intermediaries that may sit in sanctioned regions'],
    ];
    cards.forEach(([ic, t, d], i) => {
      const x = 0.6 + i * 4.11, cy = 4.6, cw = 3.89, ch = 1.9;
      card(s, x, cy, cw, ch, { fill: WHITE, border: LINE, shadow: true, name: 'exposure-' + i });
      iconDisc(s, ic, x + 0.3, cy + 0.28, 0.62);
      T(s, t, { x: x + 0.3, y: cy + 1.0, w: cw - 0.4, h: 0.32, fontSize: 14, bold: true, color: INK });
      T(s, d, { x: x + 0.3, y: cy + 1.36, w: cw - 0.6, h: 0.45, fontSize: 12, color: MUTED });
    });
    source(s, '§3, §6.1, §7.2');
    s.addNotes([
      'Our model: we process card payments for merchants, but we do not hold relationships with the issuing banks. Schemes and acquiring partners sit between us and them.',
      'Relying on those partners to enforce sanctions has proven unreliable, and it does not take away our own regulatory liability (framework §6.1).',
      'So the control has to sit inside our own flow. The red marker is where: after we extract the issuer BIN, and before the authorisation request goes to the scheme.',
      'The three cards are the exposures the control exists for: card payments from sanctioned issuers, payouts to cards issued by sanctioned banks, and routing through intermediaries we do not control (framework §3).',
    ].join('\n\n'));
  }

  // =====================================================================
  // 3. Part 1: keep the list current
  // =====================================================================
  pres.addSection({ title: 'How it works' });
  {
    const s = pres.addSlide({ masterName: 'CONTENT', sectionTitle: 'How it works' });
    s.addText('The block list is updated weekly, with an emergency route for major designations', { placeholder: 'title' });
    tracker(s, 1);

    const phases = [
      ['Identify', ['A bank is designated under EU, UK (OFSI) or US (OFAC) sanctions', 'Sanctioned banks found in LexisNexis lists, including by ownership and control']],
      ['Map', ['Classified as a global hard stop or a regional / sectoral block', '6- and 8-digit BIN ranges generated via BINDB']],
      ['Validate & approve', ['Manual check so legitimate banks are not blocked', 'Sanctions Team (2LOD) gives the final approval']],
      ['Deploy & verify', ['Controlled upload to fraud and payout systems', 'Post-deployment check that the block is live']],
    ];
    const top = 1.75, cw = 2.78, gap = 0.333, ch = 2.55;
    phases.forEach(([name, steps], i) => {
      const x = 0.6 + i * (cw + gap), human = i === 2;
      card(s, x, top, cw, ch, { fill: human ? AMBER : CANVAS, transparency: human ? 88 : undefined, border: human ? AMBER : null, name: 'phase-' + (i + 1) });
      disc(s, x + 0.25, top + 0.25, 0.46, String(i + 1), { fill: human ? AMBER : INK, size: 15 });
      T(s, name, { x: x + 0.85, y: top + 0.2, w: cw - (human ? 1.35 : 1.0), h: 0.56, fontSize: 17, bold: true, color: INK, valign: 'middle' });
      if (human) s.addImage({ data: I.userCheck, x: x + cw - 0.48, y: top + 0.33, w: 0.3, h: 0.3 });
      T(s, steps.map((t, j) => ({ text: t, options: { bullet: { indent: 14 }, breakLine: j < steps.length - 1, paraSpaceAfter: 8 } })),
        { x: x + 0.25, y: top + 0.95, w: cw - 0.45, h: ch - 1.05, fontSize: 13, color: INK });
      if (i < 3) line(s, x + cw + 0.04, top + ch / 2, x + cw + gap - 0.04, top + ch / 2, { width: 2 });
    });

    // Weekly loop: phase 4 back to phase 1
    const ly = top + ch + 0.38;
    const c1 = 0.6 + cw / 2, c4 = 0.6 + 3 * (cw + gap) + cw / 2;
    polyline(s, [[c4, top + ch], [c4, ly], [c1, ly], [c1, top + ch + 0.02]], { dash: true, width: 1.5 });
    s.addShape(S.ROUNDED_RECTANGLE, { x: 2.3, y: ly - 0.19, w: 8.7, h: 0.38, rectRadius: 0.17, fill: { color: WHITE }, line: { color: SLATE, width: 1, dashType: 'dash' } });
    T(s, [{ text: 'Every week  ', options: { bold: true, color: INK } },
          { text: 'the full cycle runs again, and the Register is reconciled fortnightly against industry lists', options: { color: MUTED } }],
      { x: 2.4, y: ly - 0.19, w: 8.5, h: 0.38, fontSize: 12, align: 'center', valign: 'middle' });

    s.addText('Output: the Sanctioned BIN List, used in Part 2', { shape: S.ROUNDED_RECTANGLE, rectRadius: 0.17, x: 8.72, y: 1.25, w: 4.01, h: 0.36,
      fill: { color: INDIGO }, line: { type: 'none' }, fontSize: 12, bold: true, color: WHITE, align: 'center', valign: 'middle', margin: 0 });

    // Emergency route
    const ey = 5.4;
    card(s, 0.6, ey, 12.13, 1.2, { fill: RED, transparency: 92, border: RED, name: 'emergency' });
    iconDisc(s, I.bolt, 0.9, ey + 0.27, 0.66, { fill: RED, transparency: 85 });
    T(s, 'Emergency route for a major designation', { x: 1.8, y: ey + 0.2, w: 7.5, h: 0.4, fontSize: 17, bold: true, color: RED });
    T(s, 'Expedited approval, and a temporary block goes in before full BIN regeneration. Documentation and validation are completed afterwards.',
      { x: 1.8, y: ey + 0.6, w: 7.6, h: 0.5, fontSize: 13, color: INK });
    T(s, [{ text: '2 hours', options: { fontSize: 30, bold: true, color: RED, breakLine: true } },
          { text: 'to update the Register after a major designation', options: { fontSize: 11, color: INK } }],
      { x: 9.6, y: ey + 0.14, w: 2.95, h: 0.95, align: 'right' });
    source(s, '§6.2, §7.3, §7.4, §8.2, §9.1, §9.3, §10.1, §10.4');
    s.addNotes([
      'Part one is the list. When a bank is designated, we identify it, and anything it owns or controls, in our sanctions data.',
      'We classify it: is this a global hard stop, or a regional or sectoral restriction? Then we map the bank to its 6- and 8-digit BIN ranges.',
      'Before anything goes live, the ranges are checked by hand so we do not block legitimate banks, and the Sanctions Team gives the final approval. That is the amber box: a person decides.',
      'Then a controlled upload, and a check after deployment that the block is actually live. This runs every week, and the Register is reconciled against industry lists every two weeks.',
      'For a major designation we do not wait for the week: the Register is updated within two hours and a temporary block goes in ahead of the full BIN rebuild.',
    ].join('\n\n'));
  }

  // =====================================================================
  // 4. Part 2: every payment
  // =====================================================================
  {
    const s = pres.addSlide({ masterName: 'CONTENT', sectionTitle: 'How it works' });
    s.addText('Every card payment and payout is checked before it reaches the scheme', { placeholder: 'title' });
    tracker(s, 2);

    // Where the check sits
    const sy = 1.6, sh = 0.52;
    let cx = 0.6;
    [['Issuer BIN extracted', 2.75], ['Sanctions check', 2.6], ['Authorisation request to scheme', 3.7], ['Clearing & settlement', 3.08]].forEach(([t, w], i) => {
      const on = i === 1;
      s.addText(t, { shape: i === 0 ? S.PENTAGON : S.CHEVRON, x: cx, y: sy, w, h: sh, fill: { color: on ? RED : CANVAS }, line: { type: 'none' },
        fontSize: 14, bold: on, color: on ? WHITE : MUTED, align: 'center', valign: 'middle', margin: 0 });
      cx += w;
    });

    const ox = 9.43, ow = 3.3;
    [['PAYMENT TYPE', 0.6], ['WHAT IS CHECKED, AND WHERE', 3.85], ['OUTCOME', ox]].forEach(([t, x]) =>
      T(s, t, { x, y: 2.42, w: 3, h: 0.25, fontSize: 10, bold: true, color: MUTED, charSpacing: 2 }));

    const rows = [
      [I.cardInk, 'Card acquiring', 'Processing-In: merchant card payments', 'Issuer BIN vs the Sanctioned BIN List', 'Fraud Detection solution, before authorisation', 'Standard authorisation'],
      [I.payoutInk, 'Payout to card', 'Processing-Out: including refunds where the BIN is available', 'Card BIN vs the Sanctioned BIN List', 'Payout validation layer, before settlement', 'Standard settlement'],
    ];
    const ry0 = 2.78, rh = 1.42, rg = 0.3;
    rows.forEach(([ic, name, sub, check, where, no], i) => {
      const y = ry0 + i * (rh + rg), mid = y + rh / 2;
      card(s, 0.6, y, 2.95, rh, { fill: CANVAS, border: null, name: 'rail-' + i });
      s.addImage({ data: ic, x: 0.85, y: y + 0.3, w: 0.38, h: 0.38 });
      T(s, name, { x: 1.4, y: y + 0.25, w: 2.05, h: 0.45, fontSize: 19, bold: true, color: INK, valign: 'middle' });
      T(s, sub, { x: 0.85, y: y + 0.8, w: 2.55, h: 0.5, fontSize: 12, color: MUTED });
      line(s, 3.57, mid, 3.83, mid, { width: 2 });
      card(s, 3.85, y, 3.95, rh, { fill: WHITE, border: LINE, name: 'check-' + i });
      T(s, check, { x: 4.1, y: y + 0.28, w: 3.5, h: 0.45, fontSize: 17, bold: true, color: INK, valign: 'middle' });
      T(s, where, { x: 4.1, y: y + 0.82, w: 3.5, h: 0.35, fontSize: 12, color: MUTED });
      line(s, 7.82, mid, 7.93, mid, { width: 2 });
      s.addText('Match?', { shape: S.DIAMOND, x: 7.95, y: mid - 0.52, w: 1.3, h: 1.04, fill: { color: WHITE }, line: { color: SLATE, width: 1.25 },
        fontSize: 13, bold: true, color: INK, align: 'center', valign: 'middle', margin: 0 });
      const oh = 0.6, fx = 9.3;
      polyline(s, [[9.25, mid], [fx, mid], [fx, y + oh / 2], [ox - 0.02, y + oh / 2]], { color: RED, width: 1.5 });
      polyline(s, [[fx, mid], [fx, y + rh - oh / 2], [ox - 0.02, y + rh - oh / 2]], { color: GREEN, width: 1.5 });
      outcome(s, 'block', 'Declined automatically', ox, y, ow, oh);
      outcome(s, 'pass', no, ox, y + rh - oh, ow, oh);
    });

    banner(s, 0.6, 6.2, 12.13, 0.52, [
      { text: 'On every match  ', options: { bold: true, color: WHITE } },
      { text: 'a Sanctions_Block_Event is logged and retained, and escalated per Compliance procedures where required', options: { color: CANVAS } }]);
    source(s, '§4, §7.2 (minimum requirements), §7.3.1, §8.1');
    s.addNotes([
      'Part two is the payment. The strip at the top is the most important design choice: the check sits after we extract the issuer BIN, and before the authorisation request goes to the scheme. Nothing is routed, cleared or settled first.',
      'Card acquiring: the issuer BIN is matched against the Sanctioned BIN List in our fraud detection layer, in real time, before authorisation. A match is declined automatically.',
      'Payouts to cards, including refunds where we have the BIN: the same match, in the payout validation layer, before settlement.',
      'Every match is logged as a Sanctions_Block_Event, kept, and escalated where required.',
    ].join('\n\n'));
  }

  // =====================================================================
  // 5. Part 3: ownership
  // =====================================================================
  {
    const s = pres.addSlide({ masterName: 'CONTENT', sectionTitle: 'How it works' });
    s.addText('Every step has an owner, and people make the decisions', { placeholder: 'title' });
    tracker(s, 3);

    const lods = [
      ['1LOD', 'Payments & Engineering', 'Build and run the controls',
        ['Fraud Detection: real-time BIN checks for acquiring', 'FinCrime Engineering: payout validation layer, event logging, no bypass', 'FinCrime Product: control design, aligned to regulatory requirements']],
      ['2LOD', 'Sanctions Team', 'Own the list and approve changes',
        ['Owns the Sanctions Hard Block Register', 'Sets the global vs regional block taxonomy', 'Sole approver for adding or whitelisting BINs, and shared-BIN exceptions']],
      ['3LOD', 'Internal Audit', 'Independent assurance',
        ['Tests the design and operating effectiveness of real-time BIN blocking']],
    ];
    const heights = [1.55, 1.55, 1.3];
    let y = 1.75;
    lods.forEach(([tag, team, role, items], i) => {
      const h = heights[i], human = i === 1;
      card(s, 0.6, y, 8.1, h, { fill: human ? AMBER : CANVAS, transparency: human ? 88 : undefined, border: human ? AMBER : null, name: tag });
      T(s, tag, { x: 0.85, y: y + 0.2, w: 1.2, h: 0.45, fontSize: 24, bold: true, color: human ? AMBER : INDIGO });
      T(s, team, { x: 0.85, y: y + 0.66, w: 2.3, h: 0.35, fontSize: 13, bold: true, color: INK });
      T(s, role, { x: 0.85, y: y + 0.96, w: 2.3, h: 0.35, fontSize: 11, color: MUTED });
      T(s, items.map((t, j) => ({ text: t, options: { bullet: { indent: 14 }, breakLine: j < items.length - 1, paraSpaceAfter: 6 } })),
        { x: 3.3, y: y + 0.2, w: 5.2, h: h - 0.3, fontSize: 13, color: INK, valign: i === 2 ? 'middle' : 'top' });
      y += h + 0.2;
    });

    [['Weekly', 'The full BIN list update cycle', INDIGO],
     ['2 hours', 'To update the Register after a major designation', RED],
     ['1 hour', 'To report any payment that did not follow the workflow', RED]].forEach(([big, small, col], i) => {
      const sh = (1.55 + 1.55 + 1.3 + 0.4 - 0.4) / 3, sy = 1.75 + i * (sh + 0.2);
      card(s, 9.05, sy, 3.68, sh, { fill: WHITE, border: LINE, shadow: true, name: 'stat-' + i });
      T(s, big, { x: 9.3, y: sy + 0.18, w: 3.2, h: 0.65, fontSize: 34, bold: true, color: col });
      T(s, small, { x: 9.3, y: sy + 0.85, w: 3.2, h: 0.45, fontSize: 12, color: MUTED });
    });
    source(s, '§8.1, §8.2, §8.3, §9.1, §11');
    s.addNotes([
      'Who owns it. The first line builds and runs the controls: fraud detection for acquiring, FinCrime Engineering for the payout validation layer and logging, with no way to route around the check, and FinCrime Product for the design.',
      'The second line, the Sanctions Team, owns the Hard Block Register and is the only team that can add or remove a BIN. That is the amber row: a person approves every change.',
      'Internal Audit tests both the design and whether it actually works in operation.',
      'Three numbers to remember: the list updates weekly, the Register is updated within two hours of a major designation, and any payment that gets past the workflow is reported to the Sanctions Team within one hour.',
    ].join('\n\n'));
  }

  // =====================================================================
  // 6. What makes it hard
  // =====================================================================
  pres.addSection({ title: 'Lessons' });
  {
    const s = pres.addSlide({ masterName: 'CONTENT', sectionTitle: 'Lessons' });
    s.addText('Four things that make BIN blocking harder than it looks', { placeholder: 'title' });
    const items = [
      [I.font, 'Names don\'t match across datasets', 'The same bank is written differently in sanctions lists and BIN databases: abbreviations, transliterations, legal forms. Matching on unique identifiers such as the LEI is the long-term fix.'],
      [I.hash, 'BINs aren\'t banks', 'One bank spans many 6- and 8-digit ranges, and some BINs are shared across territories. Too broad and you block legitimate banks; too narrow and you miss one.'],
      [I.hourglass, 'Lists move faster than BIN data', 'There is a lag between a designation and BIN databases or scheme data catching up. The emergency route exists to cover that window.'],
      [I.sitemap, 'Ownership isn\'t on the list', 'A bank can be sanctioned through ownership or control without being named. Finding it takes an ownership assessment, not just a list lookup.'],
    ];
    items.forEach(([ic, t, d], i) => {
      const x = 0.6 + (i % 2) * 6.17, y = 1.75 + Math.floor(i / 2) * 2.5, w = 5.96, h = 2.3;
      card(s, x, y, w, h, { fill: WHITE, border: LINE, shadow: true, name: 'lesson-' + i });
      iconDisc(s, ic, x + 0.35, y + 0.35, 0.72);
      T(s, t, { x: x + 1.3, y: y + 0.38, w: w - 1.6, h: 0.65, fontSize: 18, bold: true, color: INK, valign: 'middle' });
      T(s, d, { x: x + 1.3, y: y + 1.08, w: w - 1.6, h: 1.05, fontSize: 13, color: MUTED });
    });
    source(s, '§3, §6.3, §7.4, §8.2, §10.4');
    s.addNotes([
      'Optional slide: the practical lessons. They are framed as industry problems, not as gaps in our control. Check with the framework owner before using it with an external audience.',
      'Names: sanctions lists and BIN databases spell banks differently, so name matching can miss one. Wildcard searches help today; unique identifiers are the real fix.',
      'BINs: a bank is not one number. Get the ranges too broad and you block good banks; too narrow and you miss one. Some BINs are even shared across territories.',
      'Timing: lists move faster than BIN data, which is why the emergency route exists. Ownership: banks can be sanctioned without being named, so you need ownership and control analysis, not just a lookup.',
    ].join('\n\n'));
  }

  // =====================================================================
  // 7. Takeaways (dark)
  // =====================================================================
  {
    const s = pres.addSlide({ masterName: 'DARK', sectionTitle: 'Lessons' });
    s.addText('Three things to take away', { placeholder: 'title' });
    [['We block it ourselves', 'The check sits inside our payment flow, before the scheme sees the payment. Partners don\'t carry our liability.'],
     ['The list is kept current', 'Weekly updates, a 2-hour Register update for major designations, and fortnightly reconciliation against industry lists.'],
     ['People make the decisions', 'The Sanctions Team approves every change to the list, including shared-BIN exceptions.']].forEach(([t, d], i) => {
      const x = 0.6 + i * 4.11;
      T(s, String(i + 1).padStart(2, '0'), { x, y: 2.4, w: 1.5, h: 0.9, fontSize: 48, bold: true, color: i === 2 ? AMBER : INDIGO });
      line(s, x, 3.45, x + 3.6, 3.45, { width: 1, head: false });
      T(s, t, { x, y: 3.7, w: 3.9, h: 0.45, fontSize: 20, bold: true, color: WHITE });
      T(s, d, { x, y: 4.25, w: 3.6, h: 1.4, fontSize: 15, color: CANVAS });
    });
    source(s, '§6.1, §7.2, §8.2, §9.1, §10.4', true);
    s.addNotes('Close on the three ideas: we do it ourselves, before the scheme; the list is kept current on a weekly cycle with an emergency route; and a person approves every change to what gets blocked.');
  }

  // =====================================================================
  // 8. Appendix: one-page reference
  // =====================================================================
  pres.addSection({ title: 'Appendix' });
  {
    const s = pres.addSlide({ masterName: 'CONTENT', sectionTitle: 'Appendix' });
    s.addText('Appendix: the whole process on one page', { placeholder: 'title' });
    const w = 9.9, h = w * 1080 / 1920;
    s.addImage({ path: HANDOUT, x: (13.333 - w) / 2, y: 1.25, w, h, altText: 'One-page process flow of sanctioned bank BIN blocking', objectName: 'handout' });
    source(s, '§4, §6 to §11. Print the PDF version as a handout.');
    s.addNotes('Backup slide. Use it as a handout or for Q&A; it is too dense to present from.');
  }

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log('Wrote', OUT);
})();
