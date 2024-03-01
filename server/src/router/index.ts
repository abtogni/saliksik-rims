import { Router } from "express";
import authentication from "./routes/authentication";
import users from "./routes/users";
import researches from "./routes/researches";
import notification from "./routes/notification";
import schedules from "./routes/schedules";
import presentations from "./routes/presentation";

const router = Router();

export default (): Router => {
  authentication(router);
  users(router);
  researches(router);
  notification(router);
  presentations(router);
  schedules(router);
  return router;
};
