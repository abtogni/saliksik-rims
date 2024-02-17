import {
  createNotification,
  deleteNotificationByID,
  getNotificationByID,
  getNotifications,
  getNotificationsByUserID,
  updateNotificationByID,
} from "../db/notifications";
import { Request, Response } from "express";

export const sendNewNotification = async (req: Request, res: Response) => {
  try {
    const { title, type, description, users } = req.body;

    const notification = await createNotification({
      title,
      type,
      description,
      users,
    });
    return res.status(200).json(notification).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getAllNotifcations = async (req: Request, res: Response) => {
  try {
    const notifications = await getNotifications();
    return res.status(200).json(notifications).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const fetchUserNotifications = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const notifications = await getNotificationsByUserID(userID);

    return res.status(200).json(notifications).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const fetchNotificationData = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const data = await getNotificationByID(id);

    return res.status(200).json(data).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updateNotification = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, type, description, users } = req.body;

    const notif = await getNotificationByID(id);

    notif.title = title;
    notif.type = type;
    notif.description = description;
    notif.users = users;

    notif.save();

    const updatedNotification = updateNotificationByID(id, notif);

    return res.status(200).json(updatedNotification);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deleteNotification = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedNotification = await deleteNotificationByID(id);

    return res.status(200).json(deletedNotification);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
