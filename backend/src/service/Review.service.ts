import mongoose, { FilterQuery } from "mongoose";
import config from "config";
import { IProduct } from "../interface/Product.interface";
import { ICreateReview, IReview } from "../interface/Review.interface";
import { IUser } from "../interface/User.interface";
import ErrorHandler from "../middleware/errorHandler";
import ReviewModel from "../model/Review.model";
import { getProductRating } from "./Product.service";

export async function createReview(input: ICreateReview) {
  return await ReviewModel.create(input);
}

export async function findReview(filter: FilterQuery<IReview>) {
  return await ReviewModel.findOne(filter);
}

export async function createReviewAndUpdateProduct({
  rating,
  productId,
  user,
  statement,
}: {
  rating: number;
  productId: IProduct["_id"];
  user: IUser["_id"];
  statement: string;
}) {
  const session = await mongoose.startSession();
  session.startTransaction();

  const reviewDocument = await findReview({ product: productId, user: user });

  if (reviewDocument) {
    session.endSession();
    throw new ErrorHandler(409, "Rating Already Exist");
  }

  const newReviewDocument = await createReview({
    product: productId,
    user,
    rating,
    statement,
  });

  const product = await getProductRating({ _id: productId });

  if (!product) {
    throw new ErrorHandler(404, "Product Not Found");
  }

  product.ratingSum += rating;
  product.numberOfRatings += 1;

  await product.save();

  session.endSession();

  return newReviewDocument;
}

export async function getProductReviews(
  filter: FilterQuery<IReview>,
  skip: number
) {
  return await ReviewModel.find(filter)
    .limit(config.get<number>("reviewLimitPerPage"))
    .skip(skip)
    .populate("user", "name")
    .lean();
}
