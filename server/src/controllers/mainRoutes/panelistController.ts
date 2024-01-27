import { Request, Response } from 'express';
import { PanelistModel } from "../../models/panelistModel";
import mongoose, { Document } from "mongoose";


export const getPanelists = async (_req: Request, res: Response): Promise<void> => {
    try {
        const panelists = await PanelistModel.find().sort({ createdAt: -1 });
        res.status(200).json(panelists);
    } catch (err) {
        res.status(400).json({ err: err });
    }
}


export const createPanelist = async (req : Request, res: Response) => {
    try{
        const panelist: Document = await PanelistModel.create(req.body);
        res.status(200).json(panelist);
    }catch(err){
        res.status(400).json({err})
    }

}

export const updatePanelist = async (req : Request, res: Response) => {
    const { id } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such panelist'})
    }
  
    const panelist = await PanelistModel.findOneAndUpdate({_id: id}, {
      ...req.body
    })
  
    if (!panelist) {
      return res.status(400).json({error: 'No such panelist'})
    }
  
    res.status(200).json(panelist)

}

export const deletePanelist = async (req : Request, res: Response) => {
    const { id } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such panelist'})
    }
  
    const panelist = await PanelistModel.findOneAndDelete({_id: id})
  
    if (!panelist) {
      return res.status(400).json({error: 'No such panelist'})
    }
  
    res.status(200).json(panelist)


}