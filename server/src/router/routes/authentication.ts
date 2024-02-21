import {
  login,
  logout,
  register,
  whoAmI,
} from "../../controllers/authentication";
import { Router } from "express";

export default (router: Router) => {
  router
    .post("/auth/register", register)
    .post("/auth/login", login)
    .get("/auth/logout", logout)
    .get("/auth/current-user", whoAmI);
};
