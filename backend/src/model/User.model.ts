import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import config from "config";
import { IUser } from "../interface/User.interface";

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String },
  googleId: { type: String },
  facebookId: { type: String },
});

UserSchema.pre("save", async function (next: any) {
  let user = this as IUser;

  // only hash the password if it has been modified (or is new)
  if (!user.password || !user.isModified("password")) return next();

  // Random additional data
  const salt = await bcrypt.genSalt(config.get("saltWorkFactor"));

  const hash = await bcrypt.hashSync(user.password, salt);

  // Replace the password with the hash
  user.password = hash;

  return next();
});

// Used for logging in
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const user = this as IUser;

  if (!user.password) return false;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const UserModel = model<IUser>("User", UserSchema);

export default UserModel;
