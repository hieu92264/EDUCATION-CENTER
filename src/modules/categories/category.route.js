import { useExceptionFilter } from "core/filter/exception.filter";
import express from "express";
import { CategoryController } from "./category.controller";
import { AuthGuard } from "core/guard/auth.guard";
import { ZodValidation } from "core/pipes/zod-validation.pipe";
import { CreateCategoryDTO } from "./dto/create-category.dto";
import { UpdateCategoryDTO } from "./dto/update-category.dto";

class CategoryRoute {
  static register() {
    const router = express.Router();

    router.use(AuthGuard.isAuth);

    router.get(
      "/categories",
      useExceptionFilter(
        async (req, res) => await CategoryController.getAll(req, res)
      )
    );

    router.get(
      "/categories/:id",
      useExceptionFilter(
        async (req, res) => await CategoryController.getById(req, res)
      )
    );

    router.post(
      "/categories",
      AuthGuard.hasRole(["admin", "teacher"]),
      (...ctx) => new ZodValidation(CreateCategoryDTO, ctx).validate(),
      useExceptionFilter(
        async (req, res) => await CategoryController.create(req, res)
      )
    );

    router.patch(
      "/categories/:id",
      AuthGuard.hasRole(["admin", "teacher"]),
      (...ctx) => new ZodValidation(UpdateCategoryDTO, ctx).validate(),
      useExceptionFilter(
        async (req, res) => await CategoryController.update(req, res)
      )
    );

    router.delete(
      "/categories/:id",
      AuthGuard.hasRole(["admin", "teacher"]),
      useExceptionFilter(
        async (req, res) => await CategoryController.delete(req, res)
      )
    );

    return router;
  }
}

export default CategoryRoute;
