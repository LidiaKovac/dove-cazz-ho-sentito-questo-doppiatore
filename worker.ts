import { Scraper } from "./scraper";

export const launchWorker = async () => {
  console.log("Scraping")
  const links = await Scraper.scrapeList();
  Scraper.scrapeAllDubs(links);
};
