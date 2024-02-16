import mongoose from "mongoose";

const ScheduleSchema = new mongoose.Schema({
    dateAndTime: { type: Date, required: true },
    location: { type: String, required: true },
    panelists: { type: [String], required: true },
    researches: { type: [String], required: true },
}, { timestamps: true });

export const ScheduleModel = mongoose.model('Schedule', ScheduleSchema);

//GET
export const getSchedules = () => ScheduleModel.find();
export const getScheduleByID = (id: string) => ScheduleModel.findById(id);

//POST
export const createSchedule = (values: Record<string, any>) => new ScheduleModel(values).save().then((x) => x.toObject());

//PATCH
export const updateScheduleByID = (id: string, values: Record<string, any>) => ScheduleModel.findByIdAndDelete(id, values);

//DELETE
export const deleteScheduleByID = (id: string) => ScheduleModel.findByIdAndDelete(id);