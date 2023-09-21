import express, { Request, Response } from 'express';
import { Document } from 'mongoose';
import jwt from 'jsonwebtoken';
import User from "../../models/User";

interface ErrorResponse {
  userID: string;
  email: string;
  password: string;
  [key: string]: string; // Index signature to handle dynamic properties
}

interface ValidationError {
  properties: {
    path: string;
    message: string;
  };
}

const handleErrors = (err: any): ErrorResponse => {
  let errors: ErrorResponse = { userID: '', email: '', password: '' };

  if (err.code === 11000) {
    if (err.keyPattern?.email) {
      errors.email = 'That email is already registered';
    }

    if (err.keyPattern?.userID) {
      errors.userID = 'That user ID is already registered';
    }

    return errors;
  }

  if (err.message.includes('invalid ID')) {
    errors.userID = 'Invalid username';
    return errors;
  }

  if (err.message.includes('invalid password')) {
    errors.password = 'Incorrect password';
    return errors;
  }

  if (err.message.includes('user validation failed')) {
    const validationErrors = err.errors as ValidationError[];
    validationErrors.forEach(error => {
      errors[error.properties.path] = error.properties.message;
    });
  }

  return errors;
};


const maxAge: number = 3 * 24 * 60 * 60;

const createToken = (id: string): string => {
  return jwt.sign({ id }, 'net ninja secret', {
    expiresIn: maxAge
  });
};

const signup_post = async (req: Request, res: Response): Promise<void> => {
  const { userID, email, password } = req.body;

  try {
    const user: Document = await User.create({ userID, email, password });
    const token: string = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors: ErrorResponse = handleErrors(err);
    res.status(400).json({ errors });
  }
};

const login_post = async (req: Request, res: Response): Promise<void> => {
  const { userID, password } = req.body;

  try {
    // @ts-expect-error
    const user: Document = await User.login(userID, password);
    const token: string = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors: ErrorResponse = handleErrors(err);
    res.status(400).json({ errors });
  }
};

const logout = async (req: Request, res: Response): Promise<void> => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
};

export {
  signup_post,
  login_post,
  logout
};
