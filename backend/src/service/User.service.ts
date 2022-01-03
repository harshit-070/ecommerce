import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { omit } from "lodash";
import UserModel from "../model/User.model";
import { IUser, IUserInput } from "../interface/User.interface";

export async function createUser(input: IUserInput) {
  try {
    const user = await UserModel.create(input);

    return omit(user.toJSON(), "password");
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) return false;

  return omit(user.toJSON(), "password");
}

export async function findUser(query: FilterQuery<IUser>) {
  return UserModel.findOne(query).lean();
}

export async function findUserAndUpdate(
  query: FilterQuery<IUser>,
  update: UpdateQuery<IUser>,
  option: QueryOptions = {}
) {
  const user = await UserModel.findOneAndUpdate(query, update, option);
  if (!user) return false;
  return omit(user.toJSON(), "password");
}
