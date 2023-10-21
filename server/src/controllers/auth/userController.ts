import { Request, Response } from 'express';
import { UserModel } from "../../models/userModel";
import mongoose, { Document } from "mongoose";
import jwt from 'jsonwebtoken';

const maxAge: number = 3 * 24 * 60 * 60;

export const createToken = (id: string): string => {
    return jwt.sign({ id }, 'unc research office', {
      expiresIn: maxAge
    });
  };


export const getUsers = async (req : Request, res: Response) => {
    const { researchID } = req.body;

    try{
        const presentations = await UserModel.find({researchID}).sort({createdAt: -1});
        res.status(200).json(presentations);
    }catch (err) {
        res.status(400).json({err: err});
    }
    

}

export const getUser = async (req : Request, res: Response) => {
    const { id } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'User not found'});
      }

  const user = await UserModel.findById(id)

  if (!user) {
    return res.status(404).json({error: 'User not found'})
  }
  
  res.status(200).json(user)

}

export const createUser = async (req : Request, res: Response): Promise<void> => {
    const { userID, email, password, firstName, middleName, lastName, suffix, userType } = req.body;
    try {
        const user: Document = await UserModel.create({ userID, email, password, firstName, middleName, lastName, suffix, userType });
        res.status(201).json({ message: "User Successfully Created an Account",user: user._id });
      } catch (err) {
        res.status(400).json({ err });
      }

}


export const userLogin = async (req : Request, res: Response): Promise<void> => {
    const { userID, password, userType } = req.body;
  
    try {
      const user: Document = await UserModel.login(userID, password, userType);
      const token: string = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ "message": "User Successfully Login", user: user._id });
    } catch (err) {
      res.status(400).json({ err });
    }
  };

export const userLogout = async (req: Request, res: Response): Promise<void> => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
  };

