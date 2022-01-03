import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "../routes";
import deserializeUser from "../middleware/deserialiazeUser";
function createServer() {
  const app = express();

  app.use(cors());
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(deserializeUser);

  routes(app);

  return app;
}

export default createServer;
