// userController.ts

import { Request, Response } from 'express';
import * as userHandler from '../../services/userHandler'; // Import all functions

export const getUsers = async (req: Request, res: Response) => {
  // Use userHandler.getUsers
  try {
    const users = await userHandler.getUsers(req.body.researchID);
    res.status(200).json(users);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const userId = req.query.id as string | undefined;

if (userId) {
  const user = await userHandler.getUserByID(userId);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
} else {
  res.status(400).json({ error: 'User ID is missing in the request' });
}

};


export const createUser = async (req: Request, res: Response): Promise<void> => {
  // Use userHandler.createUser
  try {
    const user = await userHandler.createUser(req.body.userID, req.body.email, req.body.password, req.body.firstName, req.body.middleName, req.body.lastName, req.body.suffix, req.body.userType);
    res.status(201).json({ message: 'User Successfully Created an Account', user: user._id });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const userLogin = async (req: Request, res: Response): Promise<void> => {
  // Use userHandler.userLogin
  try {
    const token = await userHandler.userLogin(req.body.userID, req.body.password, req.body.userType);
    res.cookie('jwt', token, { httpOnly: true });
    res.status(200).json({ message: 'Login successful' });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};

export const userLogout = async (req: Request, res: Response): Promise<void> => {
  res.clearCookie('jwt');
  res.status(200).json({ message: 'User logged out' });
};
