import mongoose from "mongoose";

const PanelistNoteSchema = new mongoose.Schema({
  panelistID: { type: String },
  comments: { type: String },
  suggestions: { type: String },
});

const PresentationSchema = new mongoose.Schema({
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'PresentationType', required: true },
    scheduleID: { type: String, required: true },
    status: { type: String, required: true },
    panelistsNotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PanelistNote', required: true }]
}, { timestamps: true });

const PanelistNotesModel = mongoose.model("PanelistNote", PanelistNoteSchema);
const PresentationModel = mongoose.model("Presentation", PresentationSchema);

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
