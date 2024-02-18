import { Router } from "express";
import authentication from "./authentication";
import users from "./users";
import researches from "./researches";
import notification from "./notification";

const router = Router();

export default (): Router => {
  authentication(router);
  users(router);
  researches(router);
  notification(router);
  return router;
};
