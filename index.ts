import mongoose from "mongoose";
import { Scraper } from "./scraper";
import "dotenv/config";
import { Letterboxd } from "./scraper/letterboxd.scraper";
import { Trakt } from "./scraper/trackt.scraper";
export const connectToDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI as string);
  return conn;
};
// TODO: login
// TODO: cerca tra due serie
// TODO: importa letterboxd account
// TODO: importa trakt.tv account
(async () => {
  await connectToDB();
  await Scraper.scrapeList();
  // Scraper.scrapeAllDubs(links)
  //  const movies =  await Letterboxd.scrapeByUsername("emilyreed85")
  // const movies = await Trakt.scrapeByUsername("pinotman")
  //  console.log(movies)
})();
