import { NextFunction, Request, Response } from "express";
import { getUserBySessionToken } from "../db/users";
import { get, merge } from "lodash";
import { config } from "dotenv";
config();

const cookie = "st";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies[cookie];

    if (!token) {
      return res.sendStatus(403);
    }

    const existingUser = await getUserBySessionToken(token);

    if (!existingUser) {
      return res.sendStatus(403);
    }
    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const isOwner = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const currentUserRole = get(req, "identity.role") as string;
    const currentUserId = get(req, "identity._id") as string;

    if (!currentUserId) {
      return res.sendStatus(400);
    }

    if (currentUserRole !== "Admin" && currentUserId.toString() !== id) {
      return res.sendStatus(403);
    }

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
