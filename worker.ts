import { Scraper } from "./scraper";

export const launchWorker = async () => {
  const links = await Scraper.scrapeList();
  Scraper.scrapeAllDubs(links);
};
