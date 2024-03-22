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
  const { researchID, scheduleID, status, time} = req.body;

  await createPresentation({
    researchID,
    scheduleID,
    status,
    time
  });

  res.status(200).end();
};

// fetch a research
export const fetchPresentation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const data = await getPresentationByID(id);

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

// update a research
export const updatePresentation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { researchID, scheduleID, status, panelistNotes, time } =
      req.body;
    const presentation = await getPresentationByID(id);

    presentation.status = status ? status : presentation.status;
    presentation.panelistNotes = panelistNotes
      ? panelistNotes
      : presentation.panelistNotes;
    presentation.scheduleID = scheduleID ? scheduleID : presentation.scheduleID;
    presentation.researchID = researchID ? researchID : presentation.researchID;
    presentation.time = time ? time : presentation.time;
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
