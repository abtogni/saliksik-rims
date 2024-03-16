import { Router } from "express";
import { isAuthenticated, isOwner } from "../../middlewares";
import {
  createNewSchedule,
  deleteSchedule,
  fetchSchedule,
  getScheduleByPanelist,
  getSchedules,
  updateSchedule,
} from "../../controllers/schedules";

export default (router: Router) => {
  //GET
  router
    .get("/schedules", isAuthenticated, getSchedules)
    .get("/schedule/:id", isAuthenticated, fetchSchedule)
    .get("/schedule/panelist/:id", isAuthenticated, getScheduleByPanelist)

    //POST
    .post("/schedule/create", isAuthenticated, createNewSchedule)

    //PATCH
    .patch("/schedule/update/:id", isAuthenticated, updateSchedule)

    //DELETE
    .delete("/schedule/delete/:id", isAuthenticated, isOwner, deleteSchedule);
};
