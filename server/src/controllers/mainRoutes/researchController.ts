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



export const getResearchData = async (req: Request, res: Response) => {
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
  const { researchTitle, researchLeaders } = req.body;


  try {
    const research = await ResearchModel.create({
      researchTitle,
      researchLeaders,
      researchStatus: 'No Status',
    });
    successResponse(res, research);
  } catch (err: any) {
    errorResponse(res, 400, err.message);
  }
};

export const updateResearch = async (req: Request, res: Response) => {
  const conceptNote = req.body;
  const { researchID } = req.query;

  if (!mongoose.Types.ObjectId.isValid(researchID as string)) {
    return errorResponse(res, 404, 'Invalid research ID');
  }

  try {
    const research = await ResearchModel.findByIdAndUpdate(
      researchID as string,
      conceptNote,
      { new: true, runValidators: true }
    );

    console.log(research)
    if (!research) {
      return errorResponse(res, 404, 'Research not found');
    }

    successResponse(res, research);
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      return errorResponse(res, 400, err.message);
    }

    errorResponse(res, 500, err.message);
  }
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
