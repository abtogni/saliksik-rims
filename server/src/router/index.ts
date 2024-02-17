import { Router } from "express";
import authentication from "./users/authentication";
import users from "./users/users";
import researches from "./researches/researches";

const router = Router();

export default (): Router => {
  authentication(router);
  users(router);
  researches(router);
  return router;
};
