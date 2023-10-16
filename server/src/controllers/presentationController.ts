import { Request, Response } from 'express';
import { PresentationModel } from "../models/presentationModel";
import mongoose, { Document } from "mongoose";


export const getpresentations = async (req : Request, res: Response): Promise<void> => {
    const { researchID } = req.body;

    try{
        const presentations = await PresentationModel.find({researchID}).sort({createdAt: -1});
        res.status(200).json(presentations);
    }catch (err) {
        res.status(400).json({err: err});
    }
    

}

export const getpresentation = async (req : Request, res: Response) => {
    const { id } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'presentation not found'});
      }

  const presentation = await PresentationModel.findById(id)

  if (!presentation) {
    return res.status(404).json({error: 'presentation not found'})
  }
  
  res.status(200).json(presentation)

}

export const createpresentation = async (req : Request, res: Response) => {
    const { presentationDate, presentationTime, researchID, panelistID, comments, minutes } = req.body
      


    try{
        const presentation: Document = await PresentationModel.create({presentationDate, presentationTime, researchID, panelistID, comments, minutes, presentationStatus : 'Pending'});
        res.status(200).json(presentation);
    }catch(err){
        res.status(400).json({err})
    }

}

export const updatepresentation = async (req : Request, res: Response) => {
    const { id } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such presentation'})
    }
  
    const presentation = await PresentationModel.findOneAndUpdate({_id: id}, {
      ...req.body
    })
  
    if (!presentation) {
      return res.status(400).json({error: 'No such presentation'})
    }
  
    res.status(200).json(presentation)

}

export const deletepresentation = async (req : Request, res: Response) => {
    const { id } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such presentation'})
    }
  
    const presentation = await PresentationModel.findOneAndDelete({_id: id})
  
    if (!presentation) {
      return res.status(400).json({error: 'No such presentation'})
    }
  
    res.status(200).json(presentation)

}