import { useExceptionFilter } from "core/filter/exception.filter";
import express from "express";
import { UserController } from "./user.controller";
import { ZodValidation } from "core/pipes/zod-validation.pipe";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { AuthGuard } from "core/guard/auth.guard";

class UserRoute {
  static register() {
    const router = express.Router();

    router.use(AuthGuard.isAuth); //middleware

    router.get(
      "/users",
      AuthGuard.hasRole(["admin", "teacher"]),
      useExceptionFilter(
        async (req, res) => await UserController.getAll(req, res)
      )
    );

    router.get(
      "/users/:id",
      AuthGuard.hasRole(["admin", "teacher"]),
      useExceptionFilter(
        async (req, res) => await UserController.getById(req, res)
      )
    );

    router.post(
      "/users",
      AuthGuard.hasRole(["admin"]),
      (...ctx) => new ZodValidation(CreateUserDTO, ctx).validate(),
      useExceptionFilter(
        async (req, res) => await UserController.create(req, res)
      )
    );

    router.patch(
      "/users/:id",
      AuthGuard.hasRole(["admin"]),
      (...ctx) => new ZodValidation(UpdateUserDTO, ctx).validate(),
      useExceptionFilter(
        async (req, res) => await UserController.update(req, res)
      )
    );

    router.delete(
      "/users/:id",
      AuthGuard.hasRole(["admin"]),
      useExceptionFilter(
        async (req, res) => await UserController.delete(req, res)
      )
    );

    return router;
  }
}

export default UserRoute;
