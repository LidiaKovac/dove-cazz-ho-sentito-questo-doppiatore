import express from "express";
import cron from "node-cron";
import { connectToDB } from "..";
import { launchWorker } from "../worker";
import user from "./services/user/user.endpoints";
import expressListEndpoints from "express-list-endpoints";

export const app = express();
const PORT = process.env.port || 3001;
app.use("/user", user);
app.listen(PORT, async() => {
  console.log("Lucy says: Oky Dokey 🔵");
  console.table(expressListEndpoints(app));
  await connectToDB();
  await launchWorker();
});
// process.env.NODE_ENV === "prod" &&
  // cron.schedule("35 23 * * *", async () => {
  // });
