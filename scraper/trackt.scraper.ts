// https://trakt.tv/users/pinotman/progress
import Work from "../api/schemas/work.schema";
import config from "../scraper.config.json";
import puppeteer, { Browser } from "puppeteer";
import { delay } from "../utils";

export class Trakt {
  static browser: Browser;
  static async initBrowser() {
    this.browser = await puppeteer.launch({
      headless: config.headless,
    });
    const page = await this.browser.newPage();
    return page;
  }
  static async scrapeByUsername(username: string) {
    
    const page =await this.initBrowser()
    await page.goto(`https://trakt.tv/users/${username}/progress`);
    const cards = await page.$$(".posters");
    const works: TraktCard[] = [];
    for (const card of cards) {
      const title = await card.$eval(".main-info h3", (h3) => h3.innerText);
      const poster = await card.$eval("img.real", (img) => img.src);
      const currWork: TraktCard = {
        title,
        poster,
      };
      const movie = await Work.findOne({
        title: { $regex: new RegExp(`${title}`, "i") },
      });
      if (movie) {
        currWork._id = movie._id;
      } else {
        const currPage = await this.browser.newPage();
        await currPage.goto("https://en.wikipedia.org");
        const toggle = await currPage.$(".search-toggle");
        toggle!.click();
        const input = await currPage.$(".cdx-text-input__input");
        await delay(500);
        await input?.type(title);
        await currPage.keyboard.press("Enter");
        await delay(1000);

        let slug: string = "";
        const h1 = await currPage.$eval("h1", (h1) => h1.innerText);
        if (h1 === "Search results") {
          const searchRes = await currPage.$eval(
            ".mw-search-results-container ul li .mw-search-result-heading a",
            (a) => a.href
          );
          const newPage = await this.browser.newPage();
          await newPage.goto(searchRes);
          await delay(1000);
          const langDropdown = await newPage.$("#p-lang-btn");
          await langDropdown?.click();
          slug = await newPage.$eval(
            "#p-lang-btn a[hreflang='it']",
            (a) => a.href.split("/").slice(-1)[0]
          );
          +(await newPage.close());
        } else {
          const langDropdown = await currPage.$("#p-lang-btn");
          await langDropdown?.click();
          const hasIt = await currPage.$("#p-lang-btn a[hreflang='it']")
          if(hasIt) {

              slug = await currPage.$eval(
                  "#p-lang-btn a[hreflang='it']",
                  (a) => a.href.split("/").slice(-1)[0]
                );
            } else {
                
            }
        }

        await delay(500);

        const work = await Work.findOne({ wikiSlug: slug });
        if (work) {
          currWork._id = work._id;
        }
        works.push(currWork)
        await currPage.close();
      }
    }
    this.browser.close();
  }
}
