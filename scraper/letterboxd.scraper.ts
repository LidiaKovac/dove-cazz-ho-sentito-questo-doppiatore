import puppeteer, { Browser } from "puppeteer";
import config from "../scraper.config.json";
import Work from "../api/schemas/work.schema";
import { delay } from "../utils";

export class Letterboxd {
  static browser: Browser;

  static async initBrowser() {
    this.browser = await puppeteer.launch({
      headless: config.headless,
    });
    const page = await this.browser.newPage();
    return page;
  }
  static async scrapeByUsername(name: string) {
    try {
      const page = await this.initBrowser();
      await page.goto(`https://letterboxd.com/${name}/films/`);
      let cards: LetterboxdCard[] = await page.$$eval(
        "li.poster-container img",
        (lis) => lis.map((li) => ({ poster: li.src, title: li.alt }))
      );
      // console.log(cards)
      const pages = await page.$$eval(
        ".paginate-page:not(.paginate-current) a",
        (as) => as.map((a) => a.href)
      );
      for (const page of pages) {
        const currPage = await this.browser.newPage();
        await currPage.goto(page);
        const currCards: LetterboxdCard[] = await currPage.$$eval(
          "li.poster-container img",
          (lis) => lis.map((li) => ({ poster: li.src, title: li.alt }))
        );
        cards = [...cards, ...currCards];
      }
      for (const card of cards) {
        const movie = await Work.findOne({
          title: { $regex: new RegExp(`${card.title}`, "i") },
        });
        if (movie) {
          card._id = movie._id;
        } else {
          const currPage = await this.browser.newPage();
          await currPage.goto("https://en.wikipedia.org");
          const toggle = await currPage.$(".search-toggle");
          toggle!.click();
          const input = await currPage.$(".cdx-text-input__input");
          await delay(500);
          await input?.type(card.title);
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
            slug = await currPage.$eval(
              "#p-lang-btn a[hreflang='it']",
              (a) => a.href.split("/").slice(-1)[0]
            );
          }

          await delay(500);

          const work = await Work.findOne({ wikiSlug: slug });
          if (work) {
            card._id = work._id;
          }
          await currPage.close();
        }
      }
      this.browser.close();
      return {
        found: cards.filter((card) => card._id),
        not_found: cards.filter((card) => !card._id),
      };
    } catch (error) {
      console.log(error);
    }
  }
}
