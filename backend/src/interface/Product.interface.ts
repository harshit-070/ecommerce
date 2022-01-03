import { Document } from "mongoose";
export interface IProduct extends Document {
  name: string;
  price: number;
  image: string;
  available: number;
  description: string;
  ratingSum: number;
  numberOfRatings: number;
}

export interface ICreateProduct {
  name: IProduct["name"];
  price: IProduct["price"];
  image: IProduct["image"];
  available: IProduct["available"];
}
