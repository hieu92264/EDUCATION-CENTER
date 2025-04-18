import { BaseServices } from "core/base_class/base.service";
import { UserModel } from "./user.model";
import bcrypt from "bcrypt";

export class UserServices extends BaseServices {
  static model = UserModel;
  static nameModule = "User";

  /**
   * @override
   * @param {*} data
   * @returns
   */
  static async create(data) {
    data.password = await bcrypt.hash(data.password, 10);
    return await super.create(data);
  }

  /**
   * @override
   * @param {*} id
   * @param {*} data
   * @returns
   */
  static async update(id, data) {
    console.log("user service", data);
    if (data.password) data.password = await bcrypt.hash(data.password, 10);
    return await super.update(id, data);
  }
}
