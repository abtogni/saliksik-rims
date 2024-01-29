// userHandler.ts

import { Document } from 'mongoose';
import { UserModel } from '../models/userModel';
import { createToken } from './tokenHandler';

export const getUsers = async (researchID: string) => {
  try {
    const users = await UserModel.find({ researchID }).sort({ createdAt: -1 });
    return users;
  } catch (err) {
    console.error(err);
    throw new Error('An error occurred while fetching users');
  }
};

export const getUserByID = async (userID: string) => {
  try {
    const user = await UserModel.findById(userID);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (err) {
    console.error(err);
    throw new Error('An error occurred while fetching the user');
  }
};

export const createUser = async (
  userID: string,
  email: string,
  password: string,
  firstName: string,
  middleName: string,
  lastName: string,
  suffix: string,
  userType: string
) => {
  try {
    const user: Document = await UserModel.create({
      userID,
      email,
      password,
      firstName,
      middleName,
      lastName,
      suffix,
      userType,
    });
    return user;
  } catch (err) {
    console.error(err);
    throw new Error('An error occurred while creating the user');
  }
};

export const userLogin = async (userID: string, password: string, userType: string) => {
  try {
    const user: Document = await UserModel.login(userID, password, userType);
    if (!user) {
      throw new Error('Authentication failed');
    }
    const token: string = createToken(user._id);
    return token;
  } catch (err: any) {
    console.error(err);
    throw new Error(err.message);
  }
};
