import { BaseServices } from "core/base_class/base.service";
import { CourseModel } from "./course.model";

export class CourseServices extends BaseServices {
  static model = CourseModel;
  static nameModule = "Course";
  static populateFields = ["categoryId"];
}
