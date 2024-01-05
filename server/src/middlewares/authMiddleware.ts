import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../models/userModel';

const secretKey = process.env.JWT_SECRET || 'unc research office';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;

  jwt.verify(token, secretKey, (err: jwt.VerifyErrors | null, decodedToken: any) => {
    if (err) {
      console.error(err.message);
      return res.status(401).json({ error: 'Authentication failed' });
    } else {
      // Authentication is successful
      res.locals.userId = decodedToken.id;
      // Respond with a 200 status code
      res.status(200).json({ message: 'Authentication successful' });
    }
  });
};

export const checkUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, secretKey, async (err: jwt.VerifyErrors | null, decodedToken: any) => {
      if (err) {
        console.error(err.message);
        res.locals.user = null;
        next();
      } else {
        try {
          const user = await UserModel.findById(decodedToken.id);
          res.locals.user = user;
          next();
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
        }
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};
