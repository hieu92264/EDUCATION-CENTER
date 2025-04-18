import express from "express";
import { AuthController } from "./auth.controller";
import { useExceptionFilter } from "core/filter/exception.filter";

class AuthRoute {
  static register() {
    const router = express.Router();

    router.post("/login", useExceptionFilter(AuthController.doLogin));

    router.post("/logout", useExceptionFilter(AuthController.doLogout));

    return router;
  }
}

export default AuthRoute;
