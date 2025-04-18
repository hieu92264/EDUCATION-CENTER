import { BaseController } from "core/base_class/base.controller";
import { ClassService } from "./class.service";
import HttpStatus from "core/constant/http-status";

export class ClassController extends BaseController {
  static service = ClassService;

  static async deleteStudents(req, res) {
    const result = await ClassService.deleteStudents(
      req.params.id,
      req.body.students
    );
    return res.status(HttpStatus.NO_CONTENT.code).json({
      message: "delete list student from class",
      data: result,
    });
  }
}
