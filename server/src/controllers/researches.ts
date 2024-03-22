import {
  createResearch,
  deleteResearchByID,
  getResearchByID,
  getResearchByUserID,
  getResearches,
  updateResearchByID,
} from "../db/researches";
import { Request, Response } from "express";

// create a new research project
export const createNewResearch = async (req: Request, res: Response) => {
  try {
    const { researchTitle, researchLeaders } = req.body;

    await createResearch({
      researchTitle,
      researchLeaders,
      researchStatus: "No Status",
    });

    return res.status(201).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

// get all researches
export const getAllResearches = async (_req: Request, res: Response) => {
  try {
    const researches = await getResearches();
    return res.status(200).json(researches).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

// get researches by userID
export const getUserResearches = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const researches = await getResearchByUserID(id);
    return res.status(200).json(researches).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

// fetch a research
export const fetchResearch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const data = await getResearchByID(id);

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

// update a research
export const updateResearch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      researchTitle,
      researchLeaders,
      researchStatus,
      conceptNote,
      presentations,
    } = req.body;

    const research = await getResearchByID(id);

    if (!research) {
      return res.status(404).json({ error: "Research not found" });
    }

    if (researchTitle) research.researchTitle = researchTitle;

    if (researchLeaders) research.researchLeaders = researchLeaders;

    if (researchStatus) research.researchStatus = researchStatus;

    if (presentations) research.presentations = presentations;

    if (conceptNote)
      research.conceptNote = {
        ...research.conceptNote,
        ...conceptNote,
      };

    await research.save();
    await updateResearchByID(id, research);

    return res.status(200).json({ message: "Research updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// delete a research
export const deleteResearch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedResearch = await deleteResearchByID(id);

    return res.status(200).json(deletedResearch);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const uploadResearchFile = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    return res.status(200).json({ message: "File uploaded successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};