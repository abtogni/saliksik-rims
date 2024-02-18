import mongoose from "mongoose";

const ResearchSchema = new mongoose.Schema(
  {
    researchTitle: { type: String },
    researchLeaders: { type: [String] },
    researchStatus: { type: String },
    conceptNote: {
      projectTitle: { type: String },
      implementingAgency: { type: String },
      cooperatingAgency: { type: String },
      projectDuration: { type: String },
      siteOfImplementation: { type: String },
      totalProjectCost: { type: Number },
      fundingSource: { type: String },
      projectDescription: { type: String },
      objectives: { type: String },
      significance: { type: String },
      methodology: { type: String },
      expectedOutputs: { type: String },
      technologyRoadmap: { type: String },
      workPlan: { type: String },
      status: { type: String },
    },
    titlePresentation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Presentation",
    },
    initialPresentation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Presentation",
    },
    finalPresentation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Presentation",
    },
  },
  { timestamps: true },
);

export const ResearchModel = mongoose.model("Research", ResearchSchema);

//GET
export const getResearches = () => ResearchModel.find();
export const getResearchByUserID = (id: string) =>
  ResearchModel.find({ researchLeaders: id });
export const getResearchByID = (id: string) => ResearchModel.findById(id);

//POST
export const createResearch = (values: Record<string, any>) =>
  new ResearchModel(values).save().then((x) => x.toObject());

//PATCH
export const updateResearchByID = (id: string, values: Record<string, any>) =>
  ResearchModel.findByIdAndUpdate(id, values);

//DELETE
export const deleteResearchByID = (id: string) =>
  ResearchModel.findByIdAndDelete(id);
