import { Request, Response } from 'express';
import { loggingModel } from '../../models/loggingModel';

const successResponse = (res: Response, data: any) => {
  res.status(200).json(data);
};

const errorResponse = (res: Response, status: number, message: string) => {
  res.status(status).json({ error: message });
};

export const getUserLogs = async (req: Request, res: Response) => {
  try {
    // Validate userID
    const userID = req.query.userID;
    if (!userID) {
      return errorResponse(res, 400, 'userID is required');
    }

    const logs = await loggingModel.find({ userIDs: userID }).sort({ createdAt: -1 });

    if (logs.length === 0) {
      return successResponse(res, []);
    }

    successResponse(res, logs);
  } catch (err: any) {
    errorResponse(res, 500, err.message);
  }
};

export const getLogs = async (_req: Request, res: Response) => {
  try {
    const logs = await loggingModel.find();

    if (logs.length === 0) {
      return successResponse(res, []);
    }

    successResponse(res, logs);
  } catch (err: any) {
    errorResponse(res, 500, err.message);
  }
};

export const createLog = async (req: Request, res: Response) => {
  try {
    const newLog = await loggingModel.create(req.body);
    res.status(201).json(newLog);
  } catch (err: any) {
    errorResponse(res, 500, err.message);
  }
};

export const updateLog = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const log = await loggingModel.findOneAndUpdate({ _id: id }, req.body, { new: true });

    if (!log) {
      return errorResponse(res, 404, 'No such log');
    }

    successResponse(res, log);
  } catch (err: any) {
    errorResponse(res, 500, err.message);
  }
};

export const deleteLog = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const log = await loggingModel.findOneAndDelete({ _id: id });

    if (!log) {
      return errorResponse(res, 404, 'No such log');
    }

    successResponse(res, log);
  } catch (err: any) {
    errorResponse(res, 500, err.message);
  }
};