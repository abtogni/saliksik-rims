import mongoose from "mongoose";

const PresentationTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const PanelistNotesSchema = new mongoose.Schema({
  panelistID: { type: String },
  comments: { type: String },
  suggestions: { type: String },
});

const PresentationSchema = new mongoose.Schema(
  {
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PresentationType",
      required: true,
    },
    scheduleID: { type: String, required: true },
    status: { type: String, required: true },
    panelistsNotes: [PanelistNotesSchema],
  },
  { timestamps: true },
);

const PresentationTypeModel = mongoose.model(
  "PresentationType",
  PresentationTypeSchema,
);
const PanelistNotesModel = mongoose.model("PanelistNote", PanelistNotesSchema);
const PresentationModel = mongoose.model("Presentation", PresentationSchema);

// Methods for PresentationType
export const getAllPresentationTypes = () => PresentationTypeModel.find();
export const createPresentationType = (values: Record<string, any>) =>
  new PresentationTypeModel(values).save().then((x) => x.toObject());
export const deletePresentationTypeByID = (id: string) =>
  PresentationTypeModel.findByIdAndDelete(id);

// Methods for PanelistNote
export const getAllPanelistNotes = () => PanelistNotesModel.find();
export const createPanelistNote = (values: Record<string, any>) =>
  new PanelistNotesModel(values).save().then((x) => x.toObject());
export const deletePanelistNoteByID = (id: string) =>
  PanelistNotesModel.findByIdAndDelete(id);

// Methods for Presentation
export const getAllPresentations = () => PresentationModel.find();
export const getPresentationByID = (id: string) =>
  PresentationModel.findById(id);
export const createPresentation = (values: Record<string, any>) =>
  new PresentationModel(values).save().then((x) => x.toObject());
export const updatePresentationByID = (
  id: string,
  values: Record<string, any>,
) => PresentationModel.findByIdAndUpdate(id, values);
export const deletePresentationByID = (id: string) =>
  PresentationModel.findByIdAndDelete(id);
