import { chromium } from 'playwright-core';
import fs from 'fs';
import path from 'path';

const artifactsDir = '/home/billy/.gemini/antigravity-ide/brain/1a140b73-aa53-4f81-a556-41dfad6c347d';
const screenshotsDir = path.join(artifactsDir, 'qa_screenshots');

if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

const routes = [
  '/',
  '/git',
  '/git/commands/git-commit',
  '/git/commands/git-rebase',
  '/github',
  '/github/commands/gh-pr-create',
  '/visual-lab',
  '/situations',
  '/cheatsheet',
  '/terminal',
  '/compare',
  '/troubleshooting',
  '/learn',
  '/reference/glossary',
  '/reference/command-index',
  '/404-test'
];

async function runQA() {
  console.log('🚀 Launching Chromium for full visual QA audit...');
  const browser = await chromium.launch({
    executablePath: '/usr/bin/chromium',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const viewports = [
    { name: 'desktop-1440', width: 1440, height: 900 },
    { name: 'desktop-1920', width: 1920, height: 1080 },
    { name: 'mobile-390', width: 390, height: 844 }
  ];

  for (const vp of viewports) {
    console.log(`\n--- Auditing Viewport: ${vp.name} (${vp.width}x${vp.height}) ---`);
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });

    for (const r of routes) {
      const url = `http://localhost:5173${r}`;
      const slug = r === '/' ? 'home' : r.replace(/\//g, '_').substring(1);
      const filename = `${vp.name}_${slug}.png`;
      const filepath = path.join(screenshotsDir, filename);

      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 5000 });
        await page.waitForTimeout(300);

        // Check horizontal overflow
        const overflow = await page.evaluate(() => {
          return document.body.scrollWidth > window.innerWidth;
        });

        console.log(`  [${vp.name}] ${r} => Loaded. Overflow: ${overflow}`);
        await page.screenshot({ path: filepath, fullPage: false });
      } catch (err) {
        console.error(`  [${vp.name}] ${r} => Failed: ${err.message}`);
      }
    }
    await page.close();
  }

  await browser.close();
  console.log('\n✅ Visual QA Audit complete! Screenshots saved to:', screenshotsDir);
}

runQA().catch((err) => {
  console.error('Fatal QA error:', err);
  process.exit(1);
});
