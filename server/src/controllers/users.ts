import { Request, Response } from "express";
import {
  deleteUserByID,
  getUserById,
  getUsers,
  updateUserByID,
} from "../db/users";

// find specific user
export const findUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await getUserById(id);

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

// get all users
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

//update user data
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      role,
      affiliation,
      firstName,
      middleName,
      lastName,
      suffix,
      email,
    } = req.body;

    const user = await getUserById(id);

    if (role) user.role = role;
    if (affiliation) user.affiliation = affiliation;
    if (firstName) user.firstName = firstName;
    if (middleName) user.middleName = middleName;
    if (lastName) user.lastName = lastName;
    if (suffix) user.suffix = suffix;
    if (email) user.email = email;

    await user.save();
    await updateUserByID(id, user);

    return res.status(200).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

// delete user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserByID(id);

    return res.json(deletedUser);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
