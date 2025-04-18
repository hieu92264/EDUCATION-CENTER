import { BaseServices } from "core/base_class/base.service";
import { ClassModel } from "./class.model";
import createHttpError from "http-errors";
import { UserModel } from "modules/user/user.model";
import { CourseModel } from "modules/course/course.model";

export class ClassService extends BaseServices {
  static model = ClassModel;
  static nameModule = "Classes";
  static populateFields = ["teacherId", "students", "courseId"];

  static async checkIfTeacher(userId) {
    const user = await UserModel.findById(userId);
    if (!user) throw createHttpError(404, "User not found");
    if (user.role !== "teacher")
      throw createHttpError(403, "User is not a teacher");
    return user;
  }

  static async checkIfCourse(courseId) {
    const course = await CourseModel.findById(courseId);
    if (!course) throw createHttpError(404, "Course not found");
    return course;
  }

  /**
   * @override
   * @param {*} data
   * @returns
   */
  static async create(data) {
    await this.checkIfTeacher(data.teacherId);

    await this.checkIfCourse(data.courseId);
    return await super.create(data);
  }

  /**
   * @override
   * @param {*} id
   * @param {*} data
   * @returns
   */
  static async update(id, data) {
    if (data.teacherId) {
      await this.checkIfTeacher(data.teacherId);
    }

    if (data.courseId) {
      await this.checkIfCourse(data.courseId);
    }

    return await super.update(id, data);
  }

  static async deleteStudents(id, listStudentId) {
    let _class = await this.model.findById(id);
    console.log("class", _class);
    if (!_class) throw createHttpError(404, "Class not found");

    _class.students = _class.students.filter(
      (studentId) => !listStudentId.includes(studentId.toString())
    );

    console.log("class student ", _class.students);

    return await _class.save();
  }
}
