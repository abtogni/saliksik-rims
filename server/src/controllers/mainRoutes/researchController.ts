import { Request, Response } from 'express';
import { ResearchModel } from '../../models/researchModel';
import mongoose from 'mongoose';

const successResponse = (res: Response, data: any) => {
  res.status(200).json(data);
};

const errorResponse = (res: Response, status: number, message: string) => {
  res.status(status).json({ error: message });
};


export const getResearches = async (req: Request, res: Response) => {
  try {
    // Validate userID
    const userID = req.query.userID;
    if (!userID) {
      return errorResponse(res, 400, 'userID is required');
    }

    const researches = await ResearchModel.find({ researchLeaders: userID }).sort({ createdAt: -1 });

    if (researches.length === 0) {
      return successResponse(res, []);
    }

    successResponse(res, researches);
  } catch (err: any) {
    errorResponse(res, 500, err.message);
  }
};



export const getResearch = async (req: Request, res: Response) => {
  try {
    const researchID: any = req.query.researchID;

    if (!mongoose.Types.ObjectId.isValid(researchID)) {
      return errorResponse(res, 404, 'Invalid research ID');
    }

    const research = await ResearchModel.findById(researchID);

    if (!research) {
      return errorResponse(res, 404, 'Research not found');
    }

    successResponse(res, research);
  } catch (err: any) {
    errorResponse(res, 500, err.message);
  }
};


export const createResearch = async (req: Request, res: Response) => {
  const { researchTitle, researchLeaders, researchMembers, researchAgency } = req.body;


  try {
    const research = await ResearchModel.create({
      researchTitle,
      researchLeaders,
      researchMembers,
      researchAgency,
      researchStatus: 'Pending Concept Note',
    });
    successResponse(res, research);
  } catch (err: any) {
    errorResponse(res, 400, err.message);
  }
};

export const updateResearch = async (req: Request, res: Response) => {
  const { id, ...updateData } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return errorResponse(res, 404, 'No such research');
  }

  const research = await ResearchModel.findOneAndUpdate({ _id: id }, updateData, { new: true });

  if (!research) {
    return errorResponse(res, 400, 'No such research');
  }

  successResponse(res, research);
};

export const deleteResearch = async (req: Request, res: Response) => {
  const { id } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return errorResponse(res, 404, 'No such research');
  }

  const research = await ResearchModel.findOneAndDelete({ _id: id });

  if (!research) {
    return errorResponse(res, 400, 'No such research');
  }

  successResponse(res, research);
};
