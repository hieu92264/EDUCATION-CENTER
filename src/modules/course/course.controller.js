import { CourseServices } from "./course.service";

const { BaseController } = require("core/base_class/base.controller");

export class CourseController extends BaseController {
  static service = CourseServices;
}
