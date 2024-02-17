import mongoose from "mongoose";
import { Request, Response } from "express";
import { getAllPresentationTypes } from "../../db/presentations";

export const getPresentationTypes = async (_req: Request, res: Response) => {
  try {
    const researches = await getAllPresentationTypes();
    return res.status(200).json({ researches }).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
