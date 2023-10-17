import { Request, Response } from 'express';
import { ResearchModel } from "../../models/researchModel";
import mongoose, { Document } from "mongoose";



export const getResearches = async (req : Request, res: Response): Promise<void> => {
    const { userID } = req.body;

    try{
        const researches = await ResearchModel.find({researchLeaders: userID}).sort({createdAt: -1});
        res.status(200).json(researches);
    }catch (err) {
        res.status(400).json({err: err});
    }
    

}

export const getResearch = async (req : Request, res: Response) => {
    const { id } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Research not found'});
      }

  const research = await ResearchModel.findById(id)

  if (!research) {
    return res.status(404).json({error: 'Research not found'})
  }
  
  res.status(200).json(research)

}

export const createResearch = async (req : Request, res: Response) => {
    const { researchTitle, researchLeaders, researchMembers} = req.body
      


    try{
        const research: Document = await ResearchModel.create({researchTitle, researchLeaders, researchMembers, researchStatus : 'Pending'});
        res.status(200).json(research);
    }catch(err){
        res.status(400).json({err})
    }

}

export const updateResearch = async (req : Request, res: Response) => {
    const { id } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such research'})
    }
  
    const research = await ResearchModel.findOneAndUpdate({_id: id}, {
      ...req.body
    })
  
    if (!research) {
      return res.status(400).json({error: 'No such research'})
    }
  
    res.status(200).json(research)

}

export const deleteResearch = async (req : Request, res: Response) => {
    const { id } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such research'})
    }
  
    const research = await ResearchModel.findOneAndDelete({_id: id})
  
    if (!research) {
      return res.status(400).json({error: 'No such research'})
    }
  
    res.status(200).json(research)

}
