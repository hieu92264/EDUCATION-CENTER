import { useExceptionFilter } from "core/filter/exception.filter";
import { AuthGuard } from "core/guard/auth.guard";
import express from "express";
import { ClassController } from "./class.controller";
import { CreateClassDTO } from "./dto/create-class.dto";
import { UpdateClassDTO } from "./dto/update-class.dto";
import { ZodValidation } from "core/pipes/zod-validation.pipe";

class ClassRoute {
  static register() {
    const router = express.Router();

    router.use(AuthGuard.isAuth);

    router.get(
      "/classes",
      useExceptionFilter(
        async (req, res) => await ClassController.getAll(req, res)
      )
    );

    router.get(
      "/classes/:id",
      useExceptionFilter(
        async (req, res) => await ClassController.getById(req, res)
      )
    );

    router.post(
      "/classes",
      AuthGuard.hasRole(["admin", "teacher"]),
      (...ctx) => new ZodValidation(CreateClassDTO, ctx).validate(),
      useExceptionFilter(
        async (req, res) => await ClassController.create(req, res)
      )
    );

    router.patch(
      "/classes/:id",
      AuthGuard.hasRole(["admin", "teacher"]),
      (...ctx) => new ZodValidation(UpdateClassDTO, ctx).validate(),
      useExceptionFilter(
        async (req, res) => await ClassController.update(req, res)
      )
    );

    router.delete(
      "/classes/:id",
      AuthGuard.hasRole(["admin", "teacher"]),
      useExceptionFilter(
        async (req, res) => await ClassController.delete(req, res)
      )
    );

    router.delete(
      "/classes/list-student/:id",
      AuthGuard.hasRole(["admin", "teacher"]),
      useExceptionFilter(
        async (req, res) => await ClassController.deleteStudents(req, res)
      )
    );

    return router;
  }
}

export default ClassRoute;
