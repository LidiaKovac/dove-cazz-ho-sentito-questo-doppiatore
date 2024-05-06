import express from "express";
import cronRoute from "./services/crons"
import { connectToDB } from "..";
import { launchWorker } from "../worker";
import user from "./services/user/user.endpoints";
import expressListEndpoints from "express-list-endpoints";

export const app = express();
const PORT = process.env.port || 3001;
app.use("/user", user);
app.use("/cron", cronRoute);
app.listen(PORT, async () => {
  console.log("Lucy says: Oky Dokey 🔵");
  console.table(expressListEndpoints(app));
});
// process.env.NODE_ENV === "prod" &&
// cron.schedule("35 23 * * *", async () => {
// });
