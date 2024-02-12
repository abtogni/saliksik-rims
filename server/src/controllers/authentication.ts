import { Request, Response } from "express";
import { createUser, getUserByUserID } from "../db/users";
import { authentication, random } from "../helpers";


// To edit
export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, userID } = req.body;

        if (!userID || !password) {
            return res.sendStatus(400);
        }

        const existingUser = await getUserByUserID(userID);

        if (existingUser) {
           return res.sendStatus(400); 
        }

        const salt = random();
        const user = await createUser({
            userID,
            email,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
        });

        return res.status(200).json(user).end();
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { userID, password } = req.body;

        if (!userID || !password) {
            return res.sendStatus(400);
        }

        const user = await getUserByUserID(userID).select('+authentication.salt +authentication.password');

        if (!user) {
            return res.sendStatus(400);
        }

        const expectedHash = authentication(user.authentication.salt, password);

        if (user.authentication.password != expectedHash) {
            return res.sendStatus(403);
        }

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        await user.save();

        res.cookie('RIMS-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/'});
    
        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}