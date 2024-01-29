import { Request, Response } from 'express';
import * as userHandler from '../../services/userHandler';
import { UserModel } from '../../models/userModel';
import mongoose from 'mongoose';

const successResponse = (res: Response, data: any, status = 200) => {
  res.status(status).json(data);
};

const errorResponse = (res: Response, message: string, status = 500) => {
  res.status(status).json({ error: message });
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userHandler.getUsers(req.body.researchID);
    successResponse(res, users);
  } catch (err: any) {
    errorResponse(res, err.message);
  }
};

export const getUser = async (req: Request, res: Response) => {
  const userId = req.query.id as string | undefined;

  if (!userId) {
    return errorResponse(res, 'User ID is missing in the request', 400);
  }

  const user = await userHandler.getUserByID(userId);

  if (user) {
    successResponse(res, user);
  } else {
    errorResponse(res, 'User not found', 404);
  }
};

export const createUser = async (req: Request, res: Response) => {
  const {
    userID,
    email,
    password,
    firstName,
    middleName,
    lastName,
    suffix,
    userType,
  } = req.body;

  try {
    const user = await userHandler.createUser(userID, email, password, firstName, middleName, lastName, suffix, userType);
    successResponse(res, { message: 'User Successfully Created an Account', user: user._id }, 201);
  } catch (err: any) {
    errorResponse(res, err.message, 400);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.body;

  if (!id) {
    return errorResponse(res, 'User ID is missing in the request', 400);
  }

  try {
    const user = await UserModel.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });

    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }

    successResponse(res, user);
  } catch (error) {
    console.error('Error updating user:', error);
    errorResponse(res, 'Internal server error', 500);
  }
};

export const userLogin = async (req: Request, res: Response) => {
  const { userID, password, userType } = req.body;

  try {
    const token = await userHandler.userLogin(userID, password, userType);
    res.cookie('jwt', token, { httpOnly: true });
    successResponse(res, { message: 'Login successful' });
  } catch (err: any) {
    errorResponse(res, err.message, 401);
  }
};

export const userLogout = async (req: Request, res: Response) => {
  res.clearCookie('jwt');
  successResponse(res, { message: 'User logged out' });
};

export const deleteUser = async (req : Request, res: Response) => {
  const { id } = req.body

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such user'})
  }

  const user = await UserModel.findOneAndDelete({_id: id})

  if (!user) {
    return res.status(400).json({error: 'No such user'})
  }

  res.status(200).json(user)


}
