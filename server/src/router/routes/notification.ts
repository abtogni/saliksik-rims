import {
  deleteNotification,
  fetchUserNotifications,
  getAllNotifcations,
  sendNewNotification,
  updateNotification,
} from "../../controllers/notification";
import { Router } from "express";
import { isAuthenticated } from "../../middlewares";

export default (router: Router) => {
  router
    //GET
    .get("/notifications/", isAuthenticated, getAllNotifcations)
    .get("/notifications/:id", isAuthenticated, fetchUserNotifications)
    //POST
    .post("/notification/create", isAuthenticated, sendNewNotification)

    //PATCH
    .patch("/notification/update/:id", isAuthenticated, updateNotification)
    //DELETE
    .delete("/notification/delete/:id", isAuthenticated, deleteNotification);
};
