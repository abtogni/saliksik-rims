import { deleteUser, getAllUsers, updateUser, findUser } from "../controllers/users";
import { Router } from "express";
import { isAuthenticated, isOwner } from "../middlewares";

export default (router: Router) => {
    //GET
    router.get('/users', isAuthenticated, getAllUsers);
    router.get('/user/:id', isAuthenticated, findUser);

    //PATCH
    router.patch('/user/update/:id', isAuthenticated, isOwner, updateUser);

    //DELETE
    router.delete('/user/delete/:id', isAuthenticated, isOwner, deleteUser);
}