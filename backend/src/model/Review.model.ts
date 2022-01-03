import { Schema, model } from "mongoose";
import { IReview } from "../interface/Review.interface";

const ReviewSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  rating: { type: Number, required: true },
  statement: { type: String, required: true },
});

const ReviewModel = model<IReview>("Rating", ReviewSchema);

export default ReviewModel;
