import mongoose from "mongoose";

const PanelistNoteSchema = new mongoose.Schema({
  panelistID: { type: String },
  presentationID: { type: String },
  comment:{
    title: { type: String },
    objective: { type: String },
    methodology: { type: String },
    others: { type: String },
  }
});

const PresentationSchema = new mongoose.Schema(
  {
    researchID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Research",
    },
    time: {type: Date },
    scheduleID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Schedule",
    },
    status: { type: String },
    panelistNotes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PanelistNote",
      },
    ],
  },
  { timestamps: true },
);

const PanelistNotesModel = mongoose.model("PanelistNote", PanelistNoteSchema);
const PresentationModel = mongoose.model("Presentation", PresentationSchema);

// Methods for PanelistNote
export const getAllPanelistNotes = () => PanelistNotesModel.find();
export const findNoteByID = (id: string) => PanelistNotesModel.findById(id);
export const getPanelistNotesByPanelist = (userID: string) =>
  PanelistNotesModel.findOne({ panelistID: userID });
export const getPanelistNotesByPresentationID = (presentationID: string) =>
  PanelistNotesModel.findOne({ presentationID });
export const createNewPanelistNote = (values: Record<string, any>) =>
  new PanelistNotesModel(values).save().then((x) => x.toObject());
export const updatePanelistNoteByID = (
  id: string,
  values: Record<string, any>,
) => PanelistNotesModel.findByIdAndUpdate(id, values);
export const deletePanelistNoteByID = (id: string) =>
  PanelistNotesModel.findByIdAndDelete(id);

// Methods for Presentation
export const getAllPresentations = () => PresentationModel.find();
export const getPresentationByID = (id: string) =>
  PresentationModel.findById(id);
export const getPresentationByResearchID = (researchID: string) =>
  PresentationModel.findOne({ researchID });
export const createPresentation = (values: Record<string, any>) =>
  new PresentationModel(values).save().then((x) => x.toObject());
export const updatePresentationByID = (
  id: string,
  values: Record<string, any>,
) => PresentationModel.findByIdAndUpdate(id, values);
export const deletePresentationByID = (id: string) =>
  PresentationModel.findByIdAndDelete(id);
