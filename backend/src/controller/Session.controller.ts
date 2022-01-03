import { NextFunction, Request, Response } from "express";
import config from "config";
import { OAuth2Client } from "google-auth-library";
import { findSessions, updateSession } from "../service/Session.service";
import { findUserAndUpdate, validatePassword } from "../service/User.service";
import generateToken from "../utils/generateToken.utils";
import { get } from "lodash";
import ErrorHandler from "../middleware/errorHandler";

export async function createUserSessionHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Validate the user's password
    const user = await validatePassword(req.body);
    if (!user) {
      throw new ErrorHandler(401, "Invalid email or password");
    }

    const { accessToken, refreshToken } = await generateToken(
      user,
      req.get("user-agent") || ""
    ).catch((e) => {
      throw new ErrorHandler(500, "Internal Server Error");
    });

    // return access & refresh tokens

    return res.send({ accessToken, refreshToken, user });
  } catch (error) {
    next(error);
  }
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  const sessions = await findSessions({ user: userId, valid: true });

  return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;

  await updateSession({ _id: sessionId }, { valid: false });

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}

export async function createUserSessionWithGoogleHandler(
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
    const user = await findUserAndUpdate(
      { email, googleId: sub },
      { email, name }
    );

    if (!user) {
      throw new ErrorHandler(404, "Please SignUp First");
    }

    const { accessToken, refreshToken } = await generateToken(
      user,
      req.get("User-Agent") || ""
    );

    return res.send({ accessToken, refreshToken, user });
  } catch (error) {
    next(error);
  }
}
