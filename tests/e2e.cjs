/* End-to-end tests for Hair Line Detector (Selenium + headless Chrome) */
const { Builder, By, until, Select, logging } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE_URL || "http://localhost:3000";
const SHOT_DIR = path.join(__dirname, "screenshots");
fs.mkdirSync(SHOT_DIR, { recursive: true });

const results = [];
let driver;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function js(script, ...args) {
  return driver.executeScript(script, ...args);
}

async function waitText(text, timeout = 20000) {
  return driver.wait(
    async () => (await js("return document.body.innerText || ''")).includes(text),
    timeout,
    `Text not found on page: ${text}`
  );
}

async function waitVisible(locator, timeout = 20000) {
  const el = await driver.wait(until.elementLocated(locator), timeout, `Not found: ${locator}`);
  await driver.wait(until.elementIsVisible(el), timeout, `Not visible: ${locator}`);
  return el;
}

async function clickEl(el) {
  await js("arguments[0].scrollIntoView({block:'center'});", el);
  await sleep(150);
  await js("arguments[0].click();", el);
}

async function clickByXPath(xpath, timeout = 20000) {
  const el = await waitVisible(By.xpath(xpath), timeout);
  await clickEl(el);
  return el;
}

async function setInput(el, value) {
  await js(
    `const el = arguments[0], value = arguments[1];
     const proto = el.tagName === 'TEXTAREA' ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
     Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, value);
     el.dispatchEvent(new Event('input', { bubbles: true }));`,
    el,
    value
  );
  await sleep(400);
}

async function countCards() {
  return (await driver.findElements(By.css(".sheen-card"))).length;
}

async function readBadgeCounts() {
  const badge = await waitVisible(By.xpath("//span[contains(., 'of 26 Available')]"), 15000);
  const txt = await badge.getText();
  const m = txt.match(/(\d+)\s+of\s+(\d+)/);
  if (!m) throw new Error(`Could not parse count badge: "${txt}"`);
  return { shown: Number(m[1]), total: Number(m[2]) };
}

async function waitCardCount(expected, timeout = 15000) {
  await driver.wait(async () => (await countCards()) === expected, timeout,
    `Expected ${expected} product cards`);
}

async function waitUrlContains(fragment, timeout = 40000) {
  await driver.wait(async () => (await driver.getCurrentUrl()).includes(fragment), timeout,
    `URL did not contain ${fragment}`);
}

async function goHome() {
  await driver.get(BASE + "/");
  await waitVisible(By.css("h1"), 60000);
  await waitText("Check your hairline easily", 40000);
}

async function openProducts() {
  await waitVisible(By.css("#products"), 30000);
  await js("document.getElementById('products').scrollIntoView({block:'start'});");
  await sleep(600);
  await waitCardCount(26);
}

async function test(name, fn) {
  const started = Date.now();
  try {
    await fn();
    results.push({ name, ok: true, ms: Date.now() - started });
    console.log(`PASS  ${name} (${Date.now() - started}ms)`);
  } catch (err) {
    const message = (err && err.message ? err.message : String(err)).split("\n")[0];
    results.push({ name, ok: false, ms: Date.now() - started, error: message });
    console.log(`FAIL  ${name} (${Date.now() - started}ms)\n      ${message}`);
    try {
      const png = await driver.takeScreenshot();
      const file = path.join(SHOT_DIR, name.replace(/[^a-z0-9]+/gi, "-").toLowerCase() + ".png");
      fs.writeFileSync(file, png, "base64");
      console.log(`      screenshot: ${file}`);
    } catch (_) {}
  }
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

(async () => {
  const options = new chrome.Options();
  options.addArguments(
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--disable-dev-shm-usage",
    "--window-size=1440,1000",
    "--allow-insecure-localhost",
    "--lang=en-US"
  );
  options.setLoggingPrefs({ browser: "ALL" });

  driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();
  await driver.manage().setTimeouts({ implicit: 0, pageLoad: 60000, script: 30000 });

  try {
    await test("home page loads", async () => {
      await goHome();
      const title = await driver.getTitle();
      assert(title.toLowerCase().includes("hair"), `Unexpected title: ${title}`);
      const h1 = await driver.wait(async () => {
        try {
          const els = await driver.findElements(By.css("h1"));
          if (!els.length) return false;
          const text = await els[0].getText();
          return text.includes("hairline") ? text : false;
        } catch (_) {
          return false;
        }
      }, 15000, "Hero heading missing or unstable");
      assert(h1, "Hero heading missing");
    });

    await test("navbar links exist and navigate", async () => {
      const analyzer = await waitVisible(By.css('a[href="/analyze"]'), 15000);
      assert(await analyzer.isDisplayed(), "Analyzer link not visible");
      const productLink = await waitVisible(By.css('a[href="/#products"]'), 15000);
      assert(await productLink.isDisplayed(), "Products link not visible");
      const homeLink = await waitVisible(By.css('a[href="/"]'), 15000);
      assert(await homeLink.isDisplayed(), "Home link not visible");
    });

    await test("product catalog renders 26 cards", async () => {
      await openProducts();
      const counts = await readBadgeCounts();
      assert(counts.total === 26, `Expected 26 total products, got ${counts.total}`);
      assert(counts.shown === 26, `Expected 26 shown products, got ${counts.shown}`);
      const body = await js("return document.body.innerText");
      assert(!body.includes("No products matched your filter"), "Empty-state shown unexpectedly");
      const heading = await waitText("Verified Hair & Scalp Care Products", 10000);
      assert(heading, "Catalog heading missing");
    });

    await test("search filter narrows products and resets", async () => {
      const input = await waitVisible(
        By.css('input[placeholder*="Search by product name"]'),
        15000
      );
      await setInput(input, "rosemary");
      await driver.wait(async () => {
        const c = await readBadgeCounts();
        return c.shown > 0 && c.shown < 26;
      }, 15000, "Search did not narrow results");
      const counts = await readBadgeCounts();
      await waitCardCount(counts.shown);

      const clear = await waitVisible(
        By.xpath("//input[contains(@placeholder,'Search by product name')]/parent::div/button"),
        10000
      );
      await clickEl(clear);
      await driver.wait(async () => (await readBadgeCounts()).shown === 26, 15000,
        "Search reset did not restore 26 products");
      await waitCardCount(26);
    });

    await test("category filter works and resets", async () => {
      await clickByXPath("//button[contains(normalize-space(.), 'Serums & Actives')]");
      await driver.wait(async () => {
        const c = await readBadgeCounts();
        return c.shown > 0 && c.shown < 26;
      }, 15000, "Category filter did not narrow results");
      const filtered = await readBadgeCounts();
      await waitCardCount(filtered.shown);

      await clickByXPath("//button[contains(normalize-space(.), 'All Products')]");
      await driver.wait(async () => (await readBadgeCounts()).shown === 26, 15000,
        "Category reset did not restore 26 products");
      await waitCardCount(26);
    });

    await test("sort by price low to high", async () => {
      const selectEl = await waitVisible(By.css("select"), 15000);
      await js("arguments[0].scrollIntoView({block:'center'});", selectEl);
      const sel = new Select(selectEl);
      await sel.selectByValue("price-asc");
      await sleep(500);
      const cards = await driver.findElements(By.css(".sheen-card"));
      const prices = [];
      for (const card of cards) {
        const text = await card.getText();
        const m = text.match(/₹\s*([\d,]+)/);
        if (m) prices.push(Number(m[1].replace(/,/g, "")));
      }
      assert(prices.length >= 20, `Could not read prices from cards (${prices.length})`);
      for (let i = 1; i < prices.length; i++) {
        assert(prices[i] >= prices[i - 1], `Prices not ascending at index ${i}: ${prices[i - 1]} -> ${prices[i]}`);
      }
      await sel.selectByValue("recommended");
      await sleep(400);
    });

    await test("AI matched toggle filters and resets", async () => {
      await clickByXPath("//button[contains(normalize-space(.), 'AI Matched for You')]");
      await driver.wait(async () => {
        const c = await readBadgeCounts();
        return c.shown > 0 && c.shown < 26;
      }, 15000, "AI matched toggle did not narrow results");
      const counts = await readBadgeCounts();
      await waitCardCount(counts.shown);
      await clickByXPath("//button[contains(normalize-space(.), 'AI Matched for You')]");
      await driver.wait(async () => (await readBadgeCounts()).shown === 26, 15000,
        "AI matched reset did not restore 26 products");
      await waitCardCount(26);
    });

    await test("product details modal opens and closes", async () => {
      const details = await waitVisible(
        By.xpath("(//button[.//span[normalize-space()='Details']])[1]"),
        15000
      );
      await clickEl(details);
      const heading = await waitVisible(
        By.xpath("//span[contains(normalize-space(.), 'Verified Key Active Ingredients')]"),
        15000
      );
      assert(await heading.isDisplayed(), "Modal ingredients heading not visible");
      const body = await js("return document.body.textContent || ''");
      assert(body.includes("Check Price Online"), "Modal action missing");
      assert(body.includes("Recommended Application & Usage Routine"), "Modal usage section missing");
      await clickByXPath("//button[normalize-space()='Close']");
      await driver.wait(until.stalenessOf(heading), 10000, "Modal did not close");
    });

    await test("theme toggle switches dark and back", async () => {
      const toggles = await driver.findElements(By.css('button[aria-label="Toggle theme"]'));
      let visible = null;
      for (const t of toggles) {
        if (await t.isDisplayed()) { visible = t; break; }
      }
      assert(visible, "Theme toggle button not found");
      const isDark = () => js("return document.documentElement.classList.contains('dark')");
      const before = await isDark();
      await clickEl(visible);
      await driver.wait(async () => (await isDark()) !== before, 10000,
        `Theme did not toggle from ${before ? "dark" : "light"}`);
      await clickEl(visible);
      await driver.wait(async () => (await isDark()) === before, 10000,
        "Theme did not toggle back to its original state");
    });

    await test("language switch to Hindi and back", async () => {
      const langBtn = await waitVisible(By.css('button[aria-label="Select language"]'), 15000);
      await clickEl(langBtn);
      const dropdown = await waitVisible(By.css("div.w-52"), 10000);
      const options = await dropdown.findElements(By.css("button"));
      assert(options.length >= 3, `Expected 3 language options, got ${options.length}`);
      await clickEl(options[1]);
      await driver.wait(async () => (await js("return localStorage.getItem('hair_lang')")) === "hi",
        10000, "Language was not persisted as hi");
      await waitText("हेयरलाइन", 10000);

      await clickEl(langBtn);
      const dropdown2 = await waitVisible(By.css("div.w-52"), 10000);
      const options2 = await dropdown2.findElements(By.css("button"));
      await clickEl(options2[0]);
      await driver.wait(async () => (await js("return localStorage.getItem('hair_lang')")) === "en",
        10000, "Language was not restored to en");
      await waitText("Check your hairline easily", 10000);
    });

    await test("analyze page upload flow runs scan and reaches results", async () => {
      await driver.get(BASE + "/analyze");
      await waitText("Upload Your Front Hairline Photo Directly", 60000);
      await clickByXPath("//button[contains(normalize-space(.), 'Sample 1 (Norwood II)')]");
      await waitVisible(By.css('img[alt="Hairline uploaded preview"]'), 15000);
      await driver.wait(async () => {
        const btn = await driver.findElement(
          By.xpath("//button[contains(normalize-space(.), 'Analyze Hairline Now')]")
        );
        return btn.isEnabled();
      }, 10000, "Analyze button stayed disabled");

      await clickByXPath("//button[contains(normalize-space(.), 'Analyze Hairline Now')]");
      await waitText("Processing Hairline Photo", 15000);
      await waitUrlContains("/results/", 45000);
      await waitText("Your Hairline Analysis Review", 30000);
      await waitCardCount(26);
      await waitText("OVERALL HAIRLINE STATUS", 15000);
      await waitText("Side Corners (Temples) Check", 15000);
      const body = await js("return document.body.innerText");
      assert(!body.includes("No products matched your filter"), "Results catalog is empty");
    });

    await test("direct results page shows report and products", async () => {
      await driver.get(BASE + "/results/demo-assessment-01");
      await waitText("Your Hairline Analysis Review", 45000);
      await waitCardCount(26);
      const counts = await readBadgeCounts();
      assert(counts.total === 26 && counts.shown === 26, `Unexpected counts: ${JSON.stringify(counts)}`);
      const body = await js("return document.body.innerText");
      assert(body.includes("Scan Match Quality"), "Confidence label missing");
      assert(!body.includes("No products matched your filter"), "Results catalog is empty");
    });

    await test("no severe browser console errors", async () => {
      const entries = await driver.manage().logs().get(logging.Type.BROWSER);
      const severe = entries.filter((e) => e.level.name === "SEVERE");
      const noise = /favicon\.ico|Download the React DevTools|net::ERR_ABORTED.*_next\/static/i;
      const real = severe.filter((e) => !noise.test(e.message));
      if (real.length) {
        throw new Error(
          "Console errors:\n" + real.map((e) => e.message).join("\n").slice(0, 1500)
        );
      }
    });
  } finally {
    try { await driver.quit(); } catch (_) {}

    const passed = results.filter((r) => r.ok).length;
    const failed = results.length - passed;
    console.log(`\n${passed} passed, ${failed} failed, ${results.length} total`);
    if (failed) {
      console.log("\nFailures:");
      for (const r of results.filter((r) => !r.ok)) {
        console.log(`- ${r.name}: ${r.error}`);
      }
      process.exitCode = 1;
    }
  }
})().catch((err) => {
  console.error("Fatal test runner error:", err);
  process.exit(2);
});
