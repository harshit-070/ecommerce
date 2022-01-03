import config from "config";
import { LeanDocument } from "mongoose";
import { IUser } from "../interface/User.interface";
import { createSession } from "../service/Session.service";
import { signJwt } from "./jwt.utils";

export default async function generateToken(
  user: LeanDocument<Omit<IUser, "comparePassword">> | any,
  userAgent: string
) {
  // create a session
  const session = await createSession(user._id, userAgent);

  // create an access token

  const accessToken = signJwt(
    { ...user, session: session._id },
    "accessTokenPrivateKey",
    { expiresIn: config.get("accessTokenTtl") } // 15 minutes,
  );

  // create a refresh token
  const refreshToken = signJwt(
    { ...user, session: session._id },
    "refreshTokenPrivateKey",
    { expiresIn: config.get("refreshTokenTtl") } // 15 minutes
  );
  return { accessToken, refreshToken };
}
