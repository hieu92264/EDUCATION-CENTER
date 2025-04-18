import { BaseController } from "core/base_class/base.controller";
import { UserServices } from "./user.service";

export class UserController extends BaseController {
  static service = UserServices;
}
