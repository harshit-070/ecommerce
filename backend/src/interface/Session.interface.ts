import { Document } from "mongoose";
import { IUser } from "./User.interface";

export interface ISession extends Document {
  user: IUser["_id"];
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}
