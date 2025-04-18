import { BaseController } from "core/base_class/base.controller";
import { CategoryService } from "./category.service";

export class CategoryController extends BaseController {
  static service = CategoryService;
}
