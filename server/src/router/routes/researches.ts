import { Router } from "express";
import { isAuthenticated, isOwner } from "../../middlewares";
import {
  createNewResearch,
  deleteResearch,
  fetchResearch,
  fetchResearchFiles,
  getAllResearches,
  getUserResearches,
  updateResearch,
  uploadResearchFile,
} from "../../controllers/researches";
import { upload } from "../../middlewares/upload";

export default (router: Router) => {
  //GET
  router
    .get("/researches", isAuthenticated, getAllResearches)
    .get("/researches/:id", isAuthenticated, getUserResearches)
    .get("/research/:id", isAuthenticated, fetchResearch)
    .get("/research/files/:id", isAuthenticated, fetchResearchFiles)

    //POST
    .post("/research/create", isAuthenticated, createNewResearch)
    .post("/research/upload/:id", isAuthenticated, upload.single("file"), uploadResearchFile)

    //PATCH
    .patch("/research/update/:id", isAuthenticated, updateResearch)

    //DELETE
    .delete("/research/delete/:id", isAuthenticated, isOwner, deleteResearch);
};
