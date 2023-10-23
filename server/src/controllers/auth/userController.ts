import { Request, Response } from 'express';
import * as userHandler from '../../services/userHandler';

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

export const userLogin = async (req: Request, res: Response) => {
  const { userID, password, userType } = req.body;

  try {
    const token = await userHandler.userLogin(userID, password, userType);
    res.cookie('jwt', token, { httpOnly: true });
    successResponse(res, { message: 'Login successful' });
  } catch (err:any) {
    errorResponse(res, err.message, 401);
  }
};

export const userLogout = async (req: Request, res: Response) => {
  res.clearCookie('jwt');
  successResponse(res, { message: 'User logged out' });
};
