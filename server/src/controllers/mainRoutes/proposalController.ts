import { Request, Response } from 'express';
import { CNModel } from '../../models/proposalModel';
import mongoose, { Document } from 'mongoose';

// Common response function
const sendResponse = (res: Response, status: number, data?: any, error?: string) => {
  res.status(status).json(data ? { data } : { error });
};

// Data validation function
const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id);

export const getProposals = async (req: Request, res: Response) => {
  try {
    const proposals = await CNModel.find({}).sort({ createdAt: -1 });
    sendResponse(res, 200, proposals);
  } catch (err: any) {
    sendResponse(res, 400, null, err.message);
  }
}

export const getProposalsByID = async (req: Request, res: Response) => {
  const researchID: any = req.query.researchID;

  try {
    const proposals = await CNModel.find({ researchID }).sort({ createdAt: -1 });
    sendResponse(res, 200, proposals);
  } catch (err: any) {
    sendResponse(res, 400, null, err.message);
  }
};

export const getProposal = async (req: Request, res: Response) => {
  const proposalID: any = req.query.proposalID;

  if (!isValidObjectId(proposalID)) {
    return sendResponse(res, 404, null, 'Proposal not found');
  }

  const proposal = await CNModel.findById(proposalID);

  if (!proposal) {
    return sendResponse(res, 404, null, 'Proposal not found');
  }

  sendResponse(res, 200, proposal);
};


export const createProposal = async (req: Request, res: Response) => {
  try {
    const { researchID, implementingDept, coopAgency, siteImplementation, projectDuration, totalCost, fundingSource, description, significance, objectives, methodology, technologyRoadmap, expectedOutput, workPlan } = req.body;
    const proposal = await CNModel.create({ researchID, implementingDept, coopAgency, siteImplementation, projectDuration, totalCost, fundingSource, description, significance, objectives, methodology, technologyRoadmap, expectedOutput, workPlan, proposalStatus: 'Pending Approval' });

    // Send a success response with the created proposal
    sendResponse(res, 200, proposal);
  } catch (err: any) {
    // Send an error response if there's an issue
    sendResponse(res, 400, null, err.message);
  }
};


export const updateProposal = async (req: Request, res: Response) => {
  const { id } = req.body;

  if (!isValidObjectId(id)) {
    return sendResponse(res, 404, null, 'No such proposal');
  }

  const updatedProposal = await CNModel.findOneAndUpdate({ _id: id }, req.body, { new: true });

  if (!updatedProposal) {
    return sendResponse(res, 400, null, 'No such proposal');
  }

  sendResponse(res, 200, updatedProposal);
};

export const deleteProposal = async (req: Request, res: Response) => {
  const { id } = req.body;

  if (!isValidObjectId(id)) {
    return sendResponse(res, 404, null, 'No such proposal');
  }

  const deletedProposal = await CNModel.findOneAndDelete({ _id: id });

  if (!deletedProposal) {
    return sendResponse(res, 400, null, 'No such proposal');
  }

  sendResponse(res, 200, deletedProposal);
};
