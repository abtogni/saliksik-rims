import { getUserById } from "../db/users";
import { createResearch, deleteResearchByID, getResearchByID, getResearches, updateResearchByID } from "../db/researches";
import { Request, Response } from "express";

// create a new research project
export const createNewResearch = async (req: Request, res: Response) => {
    try {
        const { researchTitle, researchLeaders } = req.body;

        const newResearch = await createResearch({
            researchTitle,
            researchLeaders,
            researchStatus: "No"
        });

        return res.status(200).json(newResearch).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
   
}

// get all researches
export const getAllResearches = async (_req: Request, res: Response) => {
    try {
        const researches = await getResearches();
        return res.status(200).json({researches}).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

// fetch a research
export const fetchResearch = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const data = await getResearchByID(id);

        const researchLeadersData = await Promise.all(data.researchLeaders.map(async (id) => {
            const user = await getUserById(id);
            return user;
        }));

        return res.status(200).json({data, researchLeadersData});
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

// update a research
export const updateResearch = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { researchTitle, researchLeaders, researchStatus, conceptNote } = req.body;

        const research = await getResearchByID(id);

        research.researchTitle = researchTitle;
        research.researchLeaders = researchLeaders;
        research.researchStatus = researchStatus;
        research.conceptNote = conceptNote;


        await research.save();

        const updatedResearch = await updateResearchByID(id, research);

        return res.status(200).json(updatedResearch);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

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
}