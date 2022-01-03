import { Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password?: string;
  name: string;
  googleId?: string;
  facebookId?: string;
  comparePassword: (candidatePassword: string) => Promise<Boolean>;
}
export interface IUserInput {
  email: IUser["email"];
  password?: IUser["password"];
  name: IUser["name"];
  googleId?: IUser["googleId"];
  facebookId?: IUser["facebookId"];
}
