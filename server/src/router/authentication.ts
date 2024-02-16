import { login, register, whoAmI } from "../controllers/authentication";
import { Router } from "express";

export default (router: Router) => {
    router.post('/auth/register', register);
    router.post('/auth/login', login);

    router.get('/auth/current-user', whoAmI);
};