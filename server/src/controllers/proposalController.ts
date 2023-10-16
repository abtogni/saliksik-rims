import { Request, Response } from 'express';
import { CNModel } from '../models/proposalModel';
import mongoose, { Document } from "mongoose";


export const getProposals = async (req : Request, res: Response): Promise<void> => {
    const { researchID } = req.body;

    try{
        const researches = await CNModel.find({researchID}).sort({createdAt: -1});
        res.status(200).json(researches);
    }catch (err) {
        res.status(400).json({err: err});
    }
    

}

export const getProposal = async (req : Request, res: Response) => {
    const { id } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Proposal not found'});
      }

  const proposal = await CNModel.findById(id)

  if (!proposal) {
    return res.status(404).json({error: 'Proposal not found'})
  }
  
  res.status(200).json(proposal)

}

export const createProposal = async (req : Request, res: Response) => {
    const { 
      researchID, 
      implementingDept,
      coopAgency,
      siteImplementation, 
      projectDuration,
      totalCost,
      description,
      significance,
      objectives,
      methodology,
      technologyRoadmap,
      expectedOutput,
      workPlan,
      proposalStatus
      } = req.body
      


    try{
        const proposal: Document = await CNModel.create({researchID, implementingDept, coopAgency, siteImplementation, projectDuration, totalCost, description, significance, objectives, methodology,technologyRoadmap,expectedOutput,workPlan,proposalStatus});
        res.status(200).json(proposal);
    }catch(err){
        res.status(400).json({err})
    }

}

export const updateProposal = async (req : Request, res: Response) => {
    const { id } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such research'})
    }
  
    const proposal = await CNModel.findOneAndUpdate({_id: id}, {
      ...req.body
    })
  
    if (!proposal) {
      return res.status(400).json({error: 'No such proposal'})
    }
  
    res.status(200).json(proposal)

}

export const deleteProposal = async (req : Request, res: Response) => {
    const { id } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such proposal'})
    }
  
    const proposal = await CNModel.findOneAndDelete({_id: id})
  
    if (!proposal) {
      return res.status(400).json({error: 'No such proposal'})
    }
  
    res.status(200).json(proposal)

}