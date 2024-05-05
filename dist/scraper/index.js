"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scraper = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const scraper_config_json_1 = __importDefault(require("../scraper.config.json"));
const utils_1 = require("../utils");
const doppiatore_schema_1 = __importDefault(require("../api/schemas/doppiatore.schema"));
const work_schema_1 = __importDefault(require("../api/schemas/work.schema"));
const logger_1 = require("../utils/logger");
const character_schema_1 = __importDefault(require("../api/schemas/character.schema"));
const moment_1 = __importDefault(require("moment"));
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
            }
            else {
                hasNextPage = false;
            }
        }
        return links;
    }
    static async scrapeAllDubs(links) {
        const startTime = (0, moment_1.default)(new Date());
        for (let i = 0; i < links.length; i++) {
            const link = links[i];
            if ((await this.browser.pages()).length > 10) {
                await (0, utils_1.delay)(3000);
            }
            const page = await this.browser.newPage();
            await page.goto(link);
            logger_1.Logger.log(`Scraping ${i}) ${link.split("/").slice(-1)[0]} `);
            await this.scrapeDoppiatorePage(page);
        }
        logger_1.Logger.log((0, moment_1.default)(new Date()).from(startTime));
    }
    static async scrapeDoppiatorePage(page) {
        try {
            await (0, utils_1.delay)(1000);
            const dubName = await page.$eval("h1", (el) => el.innerText);
            let dubImg;
            if (await page.$("figure:has(figcaption)>a")) {
                dubImg = await page.$eval("figure:has(figcaption)>a", (el) => el.href);
            }
            const wikiSlug = page.url().split("/").slice(-1)[0];
            let doppiatoreBySlug = await doppiatore_schema_1.default.findOne({ wikiSlug });
            if (!doppiatoreBySlug) {
                doppiatoreBySlug = new doppiatore_schema_1.default({
                    name: dubName,
                    img: dubImg,
                    wikiSlug,
                });
                await doppiatoreBySlug.save();
            }
            const dubTitle = await page.$("#Doppiaggio");
            await dubTitle?.scrollIntoView();
            const h2 = await page.$$eval("h2>*[id]", (h2s) => h2s.map((h2) => h2.textContent));
            const dubH2 = h2.findIndex((el) => el === "Doppiaggio");
            const uls = await page.$$(`h2:has(> #Doppiaggio) ~ h3 ~ ul:not(h2:has(> #${h2[dubH2 + 1]?.replaceAll(" ", "_")}) ~ h3 ~ ul)`);
            for (const ul of uls) {
                const lis = await ul.$$("li");
                for (const li of lis) {
                    const movies = await li.$$eval("h2:has(#Doppiaggio) ~ * i a", (link) => link.map((link) => link.href));
                    const characters = await li.$$eval("h2:has(#Doppiaggio) ~ * li > a", (link) => link.map((link) => link.href));
                    // for (const movie of movies) {
                    await this.scrapeMoviePage({ movies, characters }, page, doppiatoreBySlug);
                    await (0, utils_1.delay)(1000);
                    // }
                }
            }
            await page.close();
        }
        catch (error) {
            logger_1.Logger.error(error);
        }
    }
    static async scrapeMoviePage({ movies, characters }, page, dopp) {
        try {
            const chars = [];
            const movs = [];
            for (const char of characters) {
                const charBySlug = await character_schema_1.default.findOne({
                    wikiSlug: char.split("/").slice(-1)[0],
                });
                if (charBySlug) {
                    chars.push(charBySlug);
                }
                else {
                    const charData = await this.scrapeCharacterPage(char);
                    await (0, utils_1.delay)(500);
                    if (charData && charData.wikiSlug) {
                        const newChar = new character_schema_1.default(charData);
                        await newChar.save();
                        chars.push(newChar);
                    }
                }
            }
            for (const movie of movies) {
                // Logger.level(2).log(
                //   "Scraping movie slug: " + movie.split("/").slice(-1)[0]
                // )
                if ((await this.browser.pages()).length > 10) {
                    await (0, utils_1.delay)(3000);
                }
                const moviePage = await this.browser.newPage();
                await moviePage.goto(movie);
                const title = await moviePage.$eval("h1", (h1) => h1.innerText);
                const wikiSlug = movie.split("/").slice(-1)[0];
                let poster = "http://placehold.it/300";
                if (await page.$("figure a img")) {
                    poster = await page.$eval("figure a img", (img) => img.src);
                }
                const workBySlug = await work_schema_1.default.findOne({ wikiSlug });
                if (workBySlug) {
                    const ids = workBySlug.doppiatori.map((work) => work.doppiatore);
                    if (!ids.some((id) => id?.equals(dopp._id))) {
                        for (const char of chars) {
                            workBySlug.doppiatori.push({
                                doppiatore: dopp._id,
                                character: char._id,
                            });
                        }
                    }
                    await workBySlug.save();
                }
                else {
                    const work = new work_schema_1.default({ title, wikiSlug, poster });
                    const ids = work.doppiatori.map((work) => work.doppiatore);
                    if (!ids.some((id) => id?.equals(dopp._id))) {
                        for (const char of chars) {
                            work.doppiatori.push({
                                doppiatore: dopp._id,
                                character: char._id,
                            });
                        }
                    }
                    await work.save();
                    movs.push(work);
                }
                await moviePage.close();
            }
        }
        catch (error) {
            logger_1.Logger.error(error);
        }
    }
    static async scrapeCharacterPage(url) {
        try {
            if ((await this.browser.pages()).length > 10) {
                await (0, utils_1.delay)(3000);
            }
            const charPage = await this.browser.newPage();
            await charPage.goto(url);
            const name = await charPage.$eval("h1", (h1) => h1.innerText);
            let img;
            if (await charPage.$("figure img")) {
                img = await charPage.$eval("figure img", (img) => img.src);
            }
            const wikiSlug = url.split("/").slice(-1)[0];
            await charPage.close();
            return { name, img, wikiSlug };
        }
        catch (error) {
            logger_1.Logger.error(error);
        }
    }
}
exports.Scraper = Scraper;
