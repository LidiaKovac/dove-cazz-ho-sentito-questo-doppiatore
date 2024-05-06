import mongoose from "mongoose";
import { Scraper } from "./scraper";
import cron from "node-cron";
import "dotenv/config";
import express from "express";
import { Letterboxd } from "./scraper/letterboxd.scraper";
import { Trakt } from "./scraper/trackt.scraper";
import { launchWorker } from "./worker";
export const connectToDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI as string);
  return conn;
};
// TODO: login
// TODO: cerca tra due serie
// TODO: importa letterboxd account
// TODO: importa trakt.tv account

const app = express();
cron.schedule("00 23 * * *", async () => {
  await connectToDB();
  await launchWorker();
});
app.listen(process.env.port || 3001);

// (async () => {
//   //  const movies =  await Letterboxd.scrapeByUsername("emilyreed85")
//   // const movies = await Trakt.scrapeByUsername("pinotman")
//   //  console.log(movies)
// })();
