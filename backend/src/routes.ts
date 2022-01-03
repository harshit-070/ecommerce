import { Application, NextFunction, Request, Response } from "express";
import userRouter from "./router/User.routes";
import sessionRouter from "./router/Session.routes";
import productRouter from "./router/Product.routes";
import ErrorHandler from "./middleware/errorHandler";
import handleError from "./middleware/handleError";
import reviewRouter from "./router/Review.routes";
import cartRouter from "./router/Cart.routes";

function routes(app: Application) {
  app.get("/", (req: Request, res: Response) => {
    return res.sendStatus(200);
  });

  app.use("/user", userRouter);
  app.use("/session", sessionRouter);
  app.use("/product", productRouter);
  app.use("/review", reviewRouter);
  app.use("/cart", cartRouter);

  app.use((req: Request, res: Response, next: NextFunction) => {
    next(new ErrorHandler(404, "Not Found"));
  });

  app.use(
    (error: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
      console.log(error);
      return handleError(error, res);
    }
  );
}

export default routes;
