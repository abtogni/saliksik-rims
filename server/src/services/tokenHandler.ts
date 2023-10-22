import jwt from 'jsonwebtoken';
const maxAge: number = 3 * 24 * 60 * 60;

export const createToken = (id: string): string => {
    return jwt.sign({ id }, 'unc research office', {
      expiresIn: maxAge
    });
  };