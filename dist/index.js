"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const scraper_1 = require("./scraper");
require("dotenv/config");
const connectToDB = async () => {
    const conn = await mongoose_1.default.connect(process.env.MONGO_URI);
    return conn;
};
exports.connectToDB = connectToDB;
// TODO: login
// TODO: cerca tra due serie
// TODO: importa letterboxd account
// TODO: importa trakt.tv account
(async () => {
    await (0, exports.connectToDB)();
    await scraper_1.Scraper.scrapeList();
    // Scraper.scrapeAllDubs(links)
    //  const movies =  await Letterboxd.scrapeByUsername("emilyreed85")
    // const movies = await Trakt.scrapeByUsername("pinotman")
    //  console.log(movies)
})();
