import { Schema, model } from "mongoose";
import { IProduct } from "../interface/Product.interface";

const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true, default: 0 },
  image: { type: String, required: true },
  available: { type: Number, required: true, default: 0 },
  description: { type: String },
  ratingSum: { type: Number, required: true, default: 0 },
  numberOfRatings: { type: Number, required: true, default: 0 },
});

const ProductModel = model<IProduct>("Product", ProductSchema);

export default ProductModel;
