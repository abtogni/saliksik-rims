import { NextFunction, Request, Response } from "express";
import { getUserBySessionToken } from "../db/users";
import { get, merge } from "lodash";

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies['RIMS-AUTH'];

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


}

export const isOwner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const currentUserId = get(req, 'identity._id') as string;
        console.log(currentUserId);
        if (!currentUserId) {
        return res.sendStatus(400);
        }

        if (currentUserId.toString() !== id) {
        return res.sendStatus(403);
        }

        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}