import mongoose from "mongoose";
import { Scraper } from "./scraper"
import "dotenv/config"
export const connectToDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI as string)
  return conn
}



;(async () => {
  await connectToDB()
  const links = await Scraper.scrapeList()
  Scraper.scrapeAllDubs(links)
})()
