import {
  deleteUser,
  getAllUsers,
  updateUser,
  findUser,
} from "../../controllers/users";
import { Router } from "express";
import { isAuthenticated, isOwner } from "../../middlewares";

export default (router: Router) => {
  //GET
  router
    .get("/users", isAuthenticated, getAllUsers)
    .get("/user/:id", isAuthenticated, findUser)

    //PATCH
    .patch("/user/update/:id", isAuthenticated, isOwner, updateUser)

    //DELETE
    .delete("/user/delete/:id", isAuthenticated, isOwner, deleteUser);
};
