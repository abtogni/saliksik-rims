import mongoose from "mongoose";

const ConceptNoteSchema = new mongoose.Schema({
    projectTitle: { type: String },
    implementingDept: { type: String },
    cooperatingAgency: { type: String },
    projectDuration: { type: String },
    siteOfImplementation: { type: String },
    totalProjectCost: { type: Number },
    fundingSource: { type: String },
    description: { type: String },
    objectives: { type: String },
    significance: { type: String },
    methodology: { type: String },
    expectedOutputs: { type: String },
    technologyRoadmap: { type: String },
    workPlan: { type: String },
    status: { type: String, required: true },
    researchID: { type: mongoose.Schema.Types.ObjectId, ref: 'Research', required: true },
    presentation: {type: mongoose.Schema.Types.ObjectId, ref: 'Presentation', required: true},
}, { timestamps: true });


export const CNModel = mongoose.model('ConceptNote', ConceptNoteSchema);

// GET
export const getConceptNotes = () => CNModel.find();
export const getConceptNoteByID = (id: string) => CNModel.findById(id);
export const getConceptNoteByResearchID = (id: string) => CNModel.findOne({researchID: id});


// POST
export const createConceptNote = (data: Record<string,any>) => new CNModel(data).save().then((x) => x.toObject());

// PATCH
export const updateConceptNote = (id: string, data: Record<string,any>) => CNModel.findByIdAndUpdate(id, data);

// DELETE
export const deleteConceptNote = async (id: string) => CNModel.findByIdAndDelete(id);


