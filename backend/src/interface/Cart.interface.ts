import { Document } from "mongoose";
import { IProduct } from "./Product.interface";
import { IUser } from "./User.interface";

export interface ICart extends Document {
  user: IUser["_id"];
  products: { product: IProduct["_id"]; quantity: number }[];
  isOrdered: boolean;
}

export interface ICreateCart {
  user: ICart["user"];
  isOrdered: ICart["isOrdered"];
}
