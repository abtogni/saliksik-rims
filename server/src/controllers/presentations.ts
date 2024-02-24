import { Request, Response } from "express";

import {
  createPresentation,
  deletePresentationByID,
  getAllPresentations,
  getPresentationByID,
  updatePresentationByID,
} from "../db/presentations";

// get all presentations
export const getPresentations = async (_req: Request, res: Response) => {
  try {
    const data = await getAllPresentations();
    return res.status(200).json(data).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

// create new presentation
export const createNewPresentation = async (req: Request, res: Response) => {
  const { researchID, scheduleID, status } = req.body;

  await createPresentation({
    researchID,
    scheduleID,
    status,
  });

  res.status(200).end();
};

// fetch a research
export const fetchPresentation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const data = await getPresentationByID(id);

    return res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

// update a research
export const updatePresentation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { researchID, scheduleID, status, panelistNotes } = req.body;
    const presentation = await getPresentationByID(id);

    presentation.status = status;
    presentation.panelistNotes = panelistNotes;
    presentation.scheduleID = scheduleID;
    presentation.researchID = researchID;
    await presentation.save();

    await updatePresentationByID(id, presentation);

    return res.status(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

// delete a research
export const deletePresentation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await deletePresentationByID(id);

    return res.status(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
