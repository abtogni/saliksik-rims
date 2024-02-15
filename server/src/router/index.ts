import { Router, Request, Response } from "express";
import authentication from "./authentication";
import users from "./users";
import researches from "./researches";

const router = Router();

export default (): Router => {
    router.get('/', (_req: Request, res: Response) => {
        res.send('hello world')
    })
    authentication(router);
    users(router);
    researches(router);
    return router;
}