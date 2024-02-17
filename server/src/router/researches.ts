import { Router } from "express";
import { isAuthenticated, isOwner } from "../middlewares";
import {
  createNewResearch,
  deleteResearch,
  fetchResearch,
  getAllResearches,
  updateResearch,
} from "../../controllers/researches/researches";

export default (router: Router) => {
  //GET
  router
    .get("/researches", isAuthenticated, getAllResearches)
    .get("/research/:id", isAuthenticated, fetchResearch)

    //POST
    .post("/research/create", isAuthenticated, createNewResearch)

    //PATCH
    .patch("/research/update/:id", isAuthenticated, updateResearch)

    //DELETE
    .delete("/research/delete/:id", isAuthenticated, isOwner, deleteResearch);
};
