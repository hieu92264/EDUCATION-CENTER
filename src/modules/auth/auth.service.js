import createHttpError from "http-errors";
import { UserModel } from "modules/user/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { UserTokenModel } from "./auth.model";

export class AuthServices {
  static async doLogin(data) {
    if (!data.email && !data.password)
      throw createHttpError(400, "Email and password are required");

    const existUser = await UserModel.findOne({ email: data.email });

    if (!existUser) throw createHttpError(404, "User not found");

    if (!(await bcrypt.compareSync(data.password, existUser.password)))
      throw createHttpError(401, "Invalid password");

    let payload = {
      name: existUser.fullname,
      email: existUser.email,
      role: existUser.role,
    };

    const access_token = jwt.sign(payload, process.env.JWT_SECRET);
    if (!access_token)
      throw createHttpError(500, "Failed to generate access token");

    await UserTokenModel.create({
      user_id: existUser.id,
      access_token: access_token,
      expireAt: new Date(Date.now() + 60 * 60 * 1000),
    });

    payload.access_token = access_token;
    return payload;
  }

  static async doLogout(token) {
    const result = await UserTokenModel.deleteOne({ access_token: token });
    if (result.deletedCount === 1) return true;
    if (result.deletedCount === 0)
      throw createHttpError(404, "Token not found");
  }
}
