import { Router } from "express";
import { launchWorker } from "../../../worker";
import { connectToDB } from "../../..";

const cron = Router();

cron.get("/all", async (_, res, next) => {
  try {
    await connectToDB()
    await launchWorker();
    res.send("Done");
  } catch (error) {
    console.log(error);
  }
});

export default cron;
