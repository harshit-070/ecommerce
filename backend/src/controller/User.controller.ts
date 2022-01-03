import { NextFunction, Request, Response } from "express";
import config from "config";
import ErrorHandler from "../middleware/errorHandler";
import { createUser, findUser } from "../service/User.service";
import logger from "../utils/logger.utils";
import { OAuth2Client } from "google-auth-library";
import { get } from "lodash";
import generateToken from "../utils/generateToken.utils";

export async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);
    const { accessToken, refreshToken } = await generateToken(
      user,
      req.get("User-Agent") || ""
    );
    return res.send({ accessToken, refreshToken, user });
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export async function createUserWithGoogleHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = get(req.body, "token");
    const client = new OAuth2Client(config.get<string>("GOOGLE_CLIENT_ID"));

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: config.get<string>("GOOGLE_CLIENT_ID"),
    });

    const payload = ticket.getPayload();

    if (!payload) {
      throw new ErrorHandler(403, "Invalid Token");
    }

    const { email, name, sub } = payload;
    const user = await findUser({ email, googleId: sub });

    if (user) {
      throw new ErrorHandler(409, "User Already Exist");
    }

    if (!email || !name) {
      throw new ErrorHandler(400, "Not a valid email or name");
    }

    const newUser = await createUser({ email, name, googleId: sub });

    const { accessToken, refreshToken } = await generateToken(
      newUser,
      req.get("User-Agent") || ""
    );

    return res.send({ accessToken, refreshToken, newUser });
  } catch (error) {
    next(error);
  }
}
