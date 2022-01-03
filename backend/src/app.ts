import dotenv from "dotenv";
import config from "config";
import createServer from "./utils/server.utils";
import log from "./utils/logger.utils";
import connect from "./utils/connect.utils";

const app = createServer();

dotenv.config();

const port = process.env.PORT || config.get<number>("port");

app.listen(port, async () => {
  log.info(`Listening on http://localhost:${port}`);

  connect();
});
