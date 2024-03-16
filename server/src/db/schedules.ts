import mongoose from "mongoose";

const ScheduleSchema = new mongoose.Schema(
  {
    dateAndTime: { type: Date, required: true },
    location: { type: String, required: true },
    panelists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    presentations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Presentation",
      },
    ],
  },
  { timestamps: true },
);

export const ScheduleModel = mongoose.model("Schedule", ScheduleSchema);

//GET
export const getAllSchedules = () => ScheduleModel.find();
export const getScheduleByID = (id: string) => ScheduleModel.findById(id);
export const getScheduleByPanelistID = (id: string) => ScheduleModel.find({ panelists: id });
//POST
export const createSchedule = (values: Record<string, any>) =>
  new ScheduleModel(values).save().then((x) => x.toObject());

//PATCH
export const updateScheduleByID = (id: string, values: Record<string, any>) =>
  ScheduleModel.findByIdAndUpdate(id, values);

//DELETE
export const deleteScheduleByID = (id: string) =>
  ScheduleModel.findByIdAndDelete(id);
