import { deleteUser, getAllUsers, updateUser, findUser } from "../controllers/users";
import { Router } from "express";
import { isAuthenticated, isOwner } from "../middlewares";

export default (router: Router) => {
    router.get('/users', isAuthenticated, getAllUsers);
    router.get('/user/:id', isAuthenticated, findUser);
    router.delete('/delete_user/:id', isAuthenticated, isOwner, deleteUser);
    router.patch('/update_user/:id', isAuthenticated, isOwner, updateUser);
}