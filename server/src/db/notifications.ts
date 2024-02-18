import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    users: { type: [String], required: true },
    referenceID: { type: String, required: true },
  },
  { timestamps: true },
);

export const NotificationModel = mongoose.model(
  "Notification",
  NotificationSchema,
);

//GET
export const getNotifications = () => NotificationModel.find();
export const getNotificationByID = (id: string) =>
  NotificationModel.findById(id);
export const getNotificationsByUserID = (userID: string) =>
  NotificationModel.find({ users: [userID] });

//POST
export const createNotification = (values: Record<string, any>) =>
  new NotificationModel(values).save().then((x) => x.toObject());

//PATCH
export const updateNotificationByID = (
  id: string,
  values: Record<string, any>,
) => NotificationModel.findByIdAndUpdate(id, values);

//DELETE
export const deleteNotificationByID = (id: string) =>
  NotificationModel.findByIdAndDelete(id);
