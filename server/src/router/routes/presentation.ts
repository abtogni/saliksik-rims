import { Router } from "express";
import { isAuthenticated } from "../../middlewares";
import {
  createNewPresentation,
  deletePresentation,
  fetchPresentation,
  getPresentations,
  updatePresentation,
} from "../../controllers/presentations";
import {
  createPanelistNote,
  deletePanelistNote,
  getPanelistNotes,
  getPanelistNotesByPresentation,
  getPanelistNotesList,
  updatePanelistNote,
} from "../../controllers/panelist_comments";

export default (router: Router) => {
  router

    //Presentation Routes

    //GET
    .get("/presentations/", isAuthenticated, getPresentations)
    .get("/presentation/:id", isAuthenticated, fetchPresentation)

    //POST
    .post("/presentation/create", isAuthenticated, createNewPresentation)

    //PATCH
    .patch("/presentation/update/:id", isAuthenticated, updatePresentation)
    //DELETE
    .delete("/presentation/delete/:id", isAuthenticated, deletePresentation)

    //Panelist Comments Route

    //GET
    .get("/comments/", isAuthenticated, getPanelistNotesList)
    .get("/comment/panelist/:id", isAuthenticated, getPanelistNotes)
    .get(
      "/comment/presentation/:id",
      isAuthenticated,
      getPanelistNotesByPresentation,
    )

    //POST
    .post("/comment/create", isAuthenticated, createPanelistNote)

    //PATCH
    .patch("/comment/update/:id", isAuthenticated, updatePanelistNote)
    //DELETE
    .delete("/comment/delete/:id", isAuthenticated, deletePanelistNote);

  //
};
