import { deleteUser, getAllUsers, updateUser } from "../controllers/users";
import { Router } from "express";
import { isAuthenticated, isOwner } from "../middlewares";

export default (router: Router) => {
    router.get('/users', isAuthenticated, getAllUsers);
    router.delete('/delete_user/:id', isAuthenticated, isOwner, deleteUser);
    router.patch('/update_user/:id', isAuthenticated, isOwner, updateUser);
}