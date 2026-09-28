// Renders index.html to PNG (2x, for slides) and PDF (vector, for print).
// Usage: node render.cjs   (needs Playwright + Chromium; set NODE_PATH if Playwright is installed globally)
const { chromium } = require('playwright');
const path = require('node:path');

const dir = __dirname;
const out = path.join(dir, 'bin-blocking-process-flow');

(async () => {
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 2 });
await page.goto('file://' + path.join(dir, 'index.html'));
await page.waitForFunction(() => window.__ready === true);

const overflow = await page.evaluate(() => window.__overflow);
if (overflow.length) console.warn('Text overflow in:', overflow);

await page.screenshot({ path: out + '.png', clip: { x: 0, y: 0, width: 1920, height: 1080 } });
await page.pdf({ path: out + '.pdf', width: '1920px', height: '1080px', printBackground: true, pageRanges: '1' });
await browser.close();
console.log('Wrote', out + '.png', 'and', out + '.pdf');
})();
