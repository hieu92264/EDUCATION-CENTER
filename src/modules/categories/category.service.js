import { BaseServices } from "core/base_class/base.service";
import { CategoryModel } from "./category.model";

export class CategoryService extends BaseServices {
  static model = CategoryModel;
  static nameModule = "Category";
}
