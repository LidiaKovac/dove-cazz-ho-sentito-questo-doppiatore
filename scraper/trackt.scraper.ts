// https://trakt.tv/users/pinotman/progress
import Work from "../api/schemas/work.schema";
import config from "../scraper.config.json";
import puppeteer, { Browser } from "puppeteer";
import { delay } from "../utils";
import { Wikipedia } from "./wikipedia.scraper";

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
    try {
      const page = await this.initBrowser();
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
          const currPage = await Wikipedia.searchQuery(this.browser, title);

          let slug: string = await Wikipedia.scrapePage(this.browser, currPage);

          await delay(500);

          const work = await Work.findOne({ wikiSlug: slug });
          if (work) {
            currWork._id = work._id;
          }
          works.push(currWork);
          await currPage.close();
        }
      }
      this.browser.close();
    } catch (error) {
      console.log(error);
    }
  }
}
