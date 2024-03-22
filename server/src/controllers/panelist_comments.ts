import { Request, Response } from "express";
import {
  createNewPanelistNote,
  deletePanelistNoteByID,
  findNoteByID,
  getAllPanelistNotes,
  getPanelistNotesByPanelist,
  getPanelistNotesByPresentationID,
  updatePresentationByID,
} from "../db/presentations";

export const getPanelistNotesList = async (_req: Request, res: Response) => {
  try {
    const data = await getAllPanelistNotes();

    return res.status(200).json(data).end();
  } catch (error) {
    return res.sendStatus(400);
  }
};

export const getPanelistNotes = async (req: Request, res: Response) => {
  try {
    const { userID } = req.body;

    const data = await getPanelistNotesByPanelist(userID);
    return res.status(200).json(data).end();
  } catch (error) {
    return res.sendStatus(400);
  }
};

export const getPanelistNotesByPresentation = async (
  req: Request,
  res: Response,
) => {
  try {
    const { presentationID } = req.body;

    const data = await getPanelistNotesByPresentationID(presentationID);
    return res.status(200).json(data).end();
  } catch (error) {
    return res.sendStatus(400);
  }
};

export const getPanelistNotesByID = async (req: Request, res: Response) =>{
  try {
    const { id } = req.params;

    const data = await findNoteByID(id);
    return res.status(200).json(data).end();
  } catch (error) {
    return res.sendStatus(400);
  }
}

export const createPanelistNote = async (req: Request, res: Response) => {
  try {
    const { panelistID, presentationID, comment } = req.body;

    await createNewPanelistNote({ panelistID, presentationID, comment }).then(
      async (result) => {
        await updatePresentationByID(result.presentationID, {
          $push: { panelistNotes: result._id },
        });
      }
    );

    return res.sendStatus(201);
  } catch (error) {
    return res.sendStatus(400);
  }
};

export const updatePanelistNote = async (req: Request, res: Response) => {
  try {
    const { panelistNoteID, presentationID, comment} = req.body;

    const note = await findNoteByID(panelistNoteID);

    note.presentationID = presentationID ? presentationID : note.presentationID;

    if (comment)
    note.comment = {
      ...note.comment,
      ...comment,
    };

    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(400);
  }
};

export const deletePanelistNote = async (req: Request, res: Response) => {
  try {
    const { noteID } = req.body;

    await deletePanelistNoteByID(noteID);

    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(400);
  }
};
