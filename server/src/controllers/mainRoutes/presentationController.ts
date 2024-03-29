import { Request, Response } from 'express';
import { PresentationModel } from "../../models/presentationModel";
import mongoose, { Document } from "mongoose";


export const getPresentations = async (_req : Request, res: Response): Promise<void> => {
    try{
        const presentations = await PresentationModel.find().sort({createdAt: -1});
        res.status(200).json(presentations);
    }catch (err) {
        res.status(400).json({err: err});
    }
    

}

export const createPresentation = async (req : Request, res: Response) => {
    const { presentationDate, researchIDs, panelistNames } = req.body
      
    try{
        const presentation: Document = await PresentationModel.create({presentationDate, researchIDs, panelistNames});
        res.status(200).json(presentation);
    }catch(err){
        res.status(400).json({err})
    }

}

export const updatePresentation = async (req : Request, res: Response) => {
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

export const deletePresentation = async (req : Request, res: Response) => {
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