import { Browser, Page } from "puppeteer";
import { delay } from "../utils";

export class Wikipedia {
  static async getitalianSlug(page: Page) {
    await delay(500);
    const langDropdown = await page.$("#p-lang-btn");
    await langDropdown?.click();
    const hasIt = await page.$("#p-lang-btn a[hreflang='it']");
    // await page.close();
    if (hasIt) {
      return await page.$eval(
        "#p-lang-btn a[hreflang='it']",
        (a) => a.href.split("/").slice(-1)[0]
      );
    } else {
      //   page.close();
      return "";
    }
  }
  static async pageExists(page: Page) {
    const p = await page.$(".mw-search-createlink");
    if (p) {
      const text = await page.$eval(".mw-search-createlink i", (p) =>
        p.innerText.includes("does not exist")
      );
      console.log(p);
      return text;
    } else return false;
  }
  static async scrapePage(browser: Browser, page: Page) {
    let slug = "";
    const hasH1 = await page.$("h1");
    if (!hasH1) {
      return "";
    }
    const h1 = await page.$eval("h1", (h1) => h1.innerText);
    if (h1 === "Search results" && !h1.includes("disambiguation")) {
      console.log("Più di una pagina trovata");
      const pageExists = await this.pageExists(page);
      if (!pageExists) {
        return "";
      }
      const searchRes = await page.$eval(
        ".mw-search-results-container ul li .mw-search-result-heading a",
        (a) => a.href
      );
      const newPage = await browser.newPage();
      await newPage.goto(searchRes);
      await delay(500);

      slug = await this.getitalianSlug(newPage);
      await newPage.close();
    }
    if (h1.includes("disambiguation")) {
      console.log("pagina di disambiguazione");
      const res = await page.$$eval(
        ":is(h2:has(#Television), h3:has(#Film_and_television)) ~ ul li a",
        (a) => a.map((link) => link.href)
      );
      const show = res.find((r) => r.toLowerCase().includes("show"));
      if (show) {
        const newPage = await browser.newPage();
        await newPage.goto(show);
        //   slug = await this.getitalianSlug(newPage)
        await delay(500);
        slug = await this.scrapePage(browser, newPage);
        return slug;
      }
    }
    slug = await this.getitalianSlug(page);
    return slug;
  }
  static async searchQuery(browser: Browser, query: string) {
    const page = await browser.newPage();
    await page.goto("https://en.wikipedia.org");
    const toggle = await page.$(".search-toggle");
    toggle!.click();
    const input = await page.$(".cdx-text-input__input");
    await delay(500);
    await input?.type(query);
    await page.keyboard.press("Enter");
    await delay(1000);
    return page;
  }
}
