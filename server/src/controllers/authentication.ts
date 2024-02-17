import { Request, Response } from "express";
import {
  createUser,
  getUserByName,
  getUserBySessionToken,
  getUserByUserID,
} from "../db/users";
import { authentication, random } from "../helpers";
import { config } from "dotenv";

config();

const cookie = process.env.JWT_COOKIE;

//REGISTER
export const register = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const {
      userID,
      role,
      affiliation,
      firstName,
      middleName,
      lastName,
      suffix,
      email,
      password,
    } = req.body;

    const existingUser = await getUserByUserID(userID);

    if (existingUser) {
      return res.sendStatus(400);
    }

    const existingName = await getUserByName(firstName, lastName);

    if (existingName) {
      return res.sendStatus(400);
    }

    const salt = random();
    await createUser({
      userID,
      role,
      affiliation,
      firstName,
      middleName,
      lastName,
      suffix,
      email,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.status(201).end();
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
};

//LOGIN
export const login = async (req: Request, res: Response) => {
  try {
    const { userID, role, password } = req.body;

    if (!userID || !role || !password) {
      return res.sendStatus(400);
    }

    const user = await getUserByUserID(userID).select(
      "+authentication.salt +authentication.password",
    );

    if (!user) {
      return res
        .status(403)
        .json({ userError: "Invalid user, please try again" });
    }

    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password != expectedHash || user.role != role) {
      return res
        .status(403)
        .json({ passwordError: "Invalid password or user, please try again" });
    }

    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString(),
    );

    await user.save();

    res.cookie(cookie, user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });

    return res.status(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

//GET CURRENT USER
export const whoAmI = async (req: Request, res: Response) => {
  const token = req.cookies[cookie];
  const user = await getUserBySessionToken(token);

  return res.status(200).json(user);
};
