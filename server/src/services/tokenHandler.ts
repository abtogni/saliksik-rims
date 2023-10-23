import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secretKey = process.env.JWT_SECRET || 'unc research office';
const maxAge: number = 3 * 24 * 60 * 60;

export const createToken = (id: string): string => {
    return jwt.sign({ id }, secretKey, {
      expiresIn: maxAge
    });
  };