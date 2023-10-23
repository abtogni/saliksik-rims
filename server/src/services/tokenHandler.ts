import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secretKey = process.env.JWT_SECRET || 'unc research office';

export const createToken = (_id: string): string => {
    return jwt.sign({_id}, secretKey, { expiresIn: '3d' })
  };