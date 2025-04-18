import { useExceptionFilter } from "core/filter/exception.filter";
import express from "express";
import { CourseController } from "./course.controller";
import { AuthGuard } from "core/guard/auth.guard";
import { ZodValidation } from "core/pipes/zod-validation.pipe";
import { CreateCourseDTO } from "./dto/create-course.dto";
import { UpdateCourseDTO } from "./dto/update-course.dto";

class CourseRoute {
  static register() {
    try {
      const router = express.Router();

      router.get(
        "/course",
        useExceptionFilter(
          async (req, res) => await CourseController.getAll(req, res)
        )
      );

      router.get(
        "/course/:id",
        useExceptionFilter(
          async (req, res) => await CourseController.getById(req, res)
        )
      );

      router.post(
        "/course",
        AuthGuard.hasRole(["admin", "teacher"]),
        (...ctx) => new ZodValidation(CreateCourseDTO, ctx).validate(),
        useExceptionFilter(
          async (req, res) => await CourseController.create(req, res)
        )
      );

      router.patch(
        "/course/update/:id",
        AuthGuard.hasRole(["admin", "teacher"]),
        (...ctx) => new ZodValidation(UpdateCourseDTO, ctx).validate(),
        useExceptionFilter(
          async (req, res) => await CourseController.update(req, res)
        )
      );

      router.delete(
        "/course/delete/:id",
        AuthGuard.hasRole(["admin", "teacher"]),
        useExceptionFilter(
          async (req, res) => await CourseController.delete(req, res)
        )
      );

      return router;
    } catch (error) {
      console.log("Course route error:>>>> ", error.message);
    }
  }
}

export default CourseRoute;
