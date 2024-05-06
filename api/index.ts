import express from "express";
import cron from "node-cron";
import { connectToDB } from "..";
import { launchWorker } from "../worker";
const app = express();
const PORT = process.env.port || 3001;
cron.schedule("35 23 * * *", async () => {
  console.log("Cron job starting...");
  await connectToDB();
  await launchWorker();
});
app.listen(PORT, () => console.log("Oky Dokey"));
