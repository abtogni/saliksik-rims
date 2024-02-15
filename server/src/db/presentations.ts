import mongoose from "mongoose";

const PresentationSchema = new mongoose.Schema({
    presentationDateAndTime: { type: Date, required: true },
    presentationLocation: { type: String, required: true },
    panelists: { type: [String], required: true },
    researches: { type: [String], required: true },
}, { timestamps: true });

export const PresentationModel = mongoose.model('Presentation', PresentationSchema);

//GET
export const getPresentations = () => PresentationModel.find();
export const getPresentationByID = (id: string) => PresentationModel.findById(id);

//POST
export const createResearch = (values: Record<string, any>) => new PresentationModel(values).save().then((x) => x.toObject());

//PATCH
export const updateResearchByID = (id: string, values: Record<string, any>) => PresentationModel.findByIdAndDelete(id, values);

//DELETE
export const deleteResearchByID = (id: string) => PresentationModel.findByIdAndDelete(id);