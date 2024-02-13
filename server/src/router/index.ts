import { Router } from "express";
import authentication from "./authentication";
import users from "./users";
import researches from "./researches";

const router = Router();

export default (): Router => {
    authentication(router);
    users(router);
    researches(router);
    return router;
}