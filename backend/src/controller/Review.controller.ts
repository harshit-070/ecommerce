import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import config from "config";
import {
  createReviewAndUpdateProduct,
  getProductReviews,
} from "../service/Review.service";

export async function createReviewHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = res.locals.user._id;
    const rating = get(req.body, "rating");
    const productId = get(req.body, "product");
    const statement = get(req.body, "statement");
    const ratingDocument = await createReviewAndUpdateProduct({
      user,
      rating,
      productId,
      statement,
    });
    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function getProductReviewsHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const page = parseInt(req.query.page as string) || 0;
    const skip = (page - 1) * config.get<number>("reviewLimitPerPage");
    const productId = req.query.product as string;
    const reviews = await getProductReviews({ product: productId }, skip);
    return res.send(reviews);
  } catch (error) {
    next(error);
  }
}
