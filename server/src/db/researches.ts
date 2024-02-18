import mongoose from "mongoose";

const ResearchSchema = new mongoose.Schema(
  {
    researchTitle: { type: String, required: true },
    researchLeaders: { type: [String], required: true },
    researchStatus: { type: String, required: true },
    conceptNote: {
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
      status: { type: String },
      presentation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Presentation",
      },
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
