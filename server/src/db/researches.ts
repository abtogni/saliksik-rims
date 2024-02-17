import mongoose from "mongoose";

const ResearchSchema = new mongoose.Schema(
  {
    researchTitle: { type: String, required: true },
    researchLeaders: { type: [String], required: true },
    researchStatus: { type: String, required: true },
    conceptNote: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ConceptNote",
      required: true,
    },
    initialPresentation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Presentation",
      required: true,
    },
    finalPresentation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Presentation",
      required: true,
    },
  },
  { timestamps: true },
);

export const ResearchModel = mongoose.model("Research", ResearchSchema);

//GET
export const getResearches = () => ResearchModel.find();
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
