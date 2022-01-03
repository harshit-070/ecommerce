import { IProduct } from "./Product.interface";
import { IUser } from "./User.interface";

export interface IReview extends Document {
  user: IUser["_id"];
  product: IProduct["_id"];
  rating: number;
  statement: string;
}

export interface ICreateReview {
  user: IReview["user"];
  product: IReview["product"];
  rating: IReview["rating"];
  statement: IReview["statement"];
}
