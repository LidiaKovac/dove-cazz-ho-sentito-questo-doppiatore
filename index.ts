import mongoose from "mongoose";
import "dotenv/config";
import { Trakt } from "./scraper/trackt.scraper";
export const connectToDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI as string);
  return conn;
};
// TODO: login
// TODO: cerca tra due serie
// TODO: importa letterboxd account
// TODO: importa trakt.tv account

const startTrakt = async () => {
  try {
    await connectToDB()
    const data = await Trakt.scrapeByUsername("pinotman")
    if (data) {
      const { works, notFound } = data
      console.log(works, notFound)
    }
  } catch (error) {
    console.log(error)
  }

}


startTrakt()