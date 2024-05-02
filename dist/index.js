"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scraper_1 = require("./scraper");
(async () => {
    const links = await scraper_1.Scraper.scrapeList();
    scraper_1.Scraper.scrapeAllDubs(links);
})();
