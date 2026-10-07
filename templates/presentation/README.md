# Global Screening presentation template

A 16:9 PowerPoint template for Global Screening talks: one theme, twelve named layouts and
master text styles. Built for projected rooms and for the team's habit of citing every claim.

| File | Use |
|---|---|
| `global-screening-template.potx` | **The template.** Double-click it to start a new presentation |
| `template-guide.pptx` / `.pdf` | One worked example per layout, with usage notes in the speaker notes |
| `layouts.cjs` | Theme colours, layout definitions and geometry. The single source of truth |
| `finish.cjs` | Post-processing pptxgenjs can't do: theme colours, master text styles, placeholder insets, `.potx` packaging |
| `build-template.cjs` | Rebuilds the template and guide: `npm install && npm run build` |
| `assets/check-shield.png` | The shield in the checkpoint motif |

The summit deck in `summit/bin-blocking-flow/deck/` is built on these layouts.

## Using it in PowerPoint

- **New deck:** double-click `global-screening-template.potx`. It opens as a new, untitled
  presentation with a title slide; add slides from **Home → New Slide**.
- **Every time:** save the `.potx` to your Custom Office Templates folder
  (`Documents\Custom Office Templates` on Windows) and it appears under **File → New → Personal**.
- **Existing deck:** **Design → Themes → Browse for Themes**, pick the `.potx`, then reapply
  layouts slide by slide (**Home → Layout**).

## Layouts

| Layout | Use it for |
|---|---|
| Title | The opening slide. The checkpoint line is part of the layout |
| Section divider | The start of each part in a longer talk |
| Title and content | Bulleted points. Tab for a second level |
| Two content | A comparison, each column with its own heading |
| Content with key point | Detail on the left, the one sentence to remember on the right |
| Key numbers | Up to three numbers, each with what it means |
| Title only | Diagrams, flows and anything custom, inside the content area |
| Title only, dark | Takeaways, or a change of pace |
| Statement | One principle, quote or turning point |
| Picture with caption | A screenshot or diagram, and what to notice in it |
| Closing | Questions and contact details |
| Blank | Full-bleed images, such as a one-page handout |

Every light content layout has a **title**, a **tag** at top right for wayfinding ("PART 1 OF
3 · THE LIST"), and a **source** line at bottom left. The footer reads "Checkout.com · Global
Screening", followed by the slide number.

## House rules the template encodes

- **Titles state the point**, not the topic: "Every payment is checked before it reaches the
  scheme", not "Payment checks".
- **Every substantive claim gets a source** on the source line: the legislation, regulator
  guidance, policy section or list entry. This is the same rule as `CLAUDE.md` § 2.
- **Colour carries meaning**, consistently: red for blocked, declined or breach; green for
  proceeds or no match; amber where a named human decides; indigo for emphasis. Don't use red
  or green decoratively.
- **Type sizes:** titles 28pt (46pt on the title slide), body 18pt, second level 16pt. Nothing
  smaller than 11pt on a projected slide except the source line and footer.
- **Arial throughout**, so slides look the same on every machine and in every viewer.

## Rebranding

Change the hex values in `HEX` at the top of `layouts.cjs` and rebuild; every layout reads from
the theme. For a one-off change, use **Design → Variants → Colors → Customize Colors** in
PowerPoint. The theme slots are: `text1` ink, `text2` muted, `accent1` indigo, `accent2` red,
`accent3` green, `accent4` amber, `accent5` slate, `accent6` rule lines.

## Building a deck in code

```js
const pptxgen = require('pptxgenjs');
const JSZip = require(require.resolve('jszip', { paths: [require.resolve('pptxgenjs')] }));
const { THEME, L, defineLayouts, bullets } = require('./layouts.cjs');
const { finish } = require('./finish.cjs')(JSZip);

const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE';
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
defineLayouts(pres, { footer: 'Checkout.com · Global Screening' });

const s = pres.addSlide({ masterName: L.CONTENT });
s.addText('Say the point in the title', { placeholder: 'title' });
s.addText(bullets(pres, ['First point', ['Second level', 1]]), { placeholder: 'body' });
s.addText('Source: …', { placeholder: 'source' });

await pres.writeFile({ fileName: 'deck.tmp.pptx' });
await finish('deck.tmp.pptx', THEME, { out: 'deck.pptx' });
```

Always fill bulleted placeholders with `bullets()`, because pptxgenjs otherwise bullets only the
first paragraph. Always run `finish()`: without it, scheme colours render in Office's stock palette.

## Limits

- Checked by rendering through LibreOffice and by OOXML validation, not yet opened in
  PowerPoint itself. Open the guide in PowerPoint once and step through the layouts before
  rolling the template out.
- Built for PowerPoint. Google Slides import is untested.
- The shield icon is from Font Awesome Free, licensed CC BY 4.0.
