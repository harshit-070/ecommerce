import mongoose from "mongoose";
import config from "config";
import log from "./logger.utils";

function connect() {
  const dbUrl = config.get<string>("dbUrl");
  console.log(dbUrl);
  mongoose
    .connect(dbUrl)
    .then(() => {
      log.info("Connected to database");
    })
    .catch((e: any) => {
      log.error(e);
      process.exit(1);
    });
}
export default connect;
