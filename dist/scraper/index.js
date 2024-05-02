"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scraper = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const scraper_config_json_1 = __importDefault(require("../scraper.config.json"));
const utils_1 = require("../utils");
class Scraper {
    static url = "https://it.wikipedia.org/";
    static browser;
    static async initBrowser() {
        this.browser = await puppeteer_1.default.launch({
            headless: scraper_config_json_1.default.headless,
        });
        const page = await this.browser.newPage();
        return page;
    }
    static async scrapeList() {
        const page = await this.initBrowser();
        await page.goto(this.url + "wiki/Categoria:Doppiatori_italiani");
        let hasNextPage = true;
        let links = [];
        while (hasNextPage) {
            const groups = await page.$$(".mw-category-group");
            for (const group of groups) {
                const lis = await group.$$eval("li>a[href]", (list) => list.map((li) => li.href));
                links = [...links, ...lis];
            }
            const nextPage = await page.$("h2+p~a[href]:nth-of-type(2)");
            if (!(await nextPage?.evaluate((el) => el.innerText.includes("succ"))))
                break;
            if (nextPage) {
                const nextPageHref = await page.evaluate((el) => el.href, nextPage);
                await page.goto(nextPageHref);
                await (0, utils_1.delay)(500);
            }
            else {
                hasNextPage = false;
            }
        }
        return links;
    }
    static async scrapeAllDubs(links) {
        for (const link of links) {
            const page = await this.browser.newPage();
            await page.goto(link);
            this.scrapePage(page);
        }
    }
    static async scrapePage(page) {
        const dubTitle = await page.$("#Doppiaggio");
        await dubTitle?.scrollIntoView();
        const h2 = await page.$$eval("h2>*[id]", (h2s) => h2s.map((h2) => h2.textContent));
        const dubH2 = h2.findIndex((el) => el === "Doppiaggio");
        const uls = await page.$$(`h2:has(> #Doppiaggio) ~ h3 ~ ul:not(h2:has(> #${h2[dubH2 + 1]?.replaceAll(" ", "_")}) ~ h3 ~ ul)`);
        let works = [];
        for (const ul of uls) {
            const lis = await ul.$$eval("li", (el) => el
                .map((e) => {
                const text = e.innerText;
                const final = {
                    actor: text.includes(" in ")
                        ? text.split(" in ")[0]
                        : text.split(" ne ")[0],
                    movies: text.includes(" in ")
                        ? text.split(" in ").slice(1).join(" in ").split(",")
                        : text.split(" ne ").slice(1).join(" in ").split(","),
                };
                if (final.movies[0].length !== 0) {
                    return final;
                }
            })
                .filter((el) => el));
            works = [...works, ...lis];
        }
        console.log(works);
    }
}
exports.Scraper = Scraper;
