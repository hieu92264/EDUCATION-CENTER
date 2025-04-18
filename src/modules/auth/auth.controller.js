import HttpStatus from "core/constant/http-status";
import { AuthServices } from "./auth.service";

export class AuthController {
  static async doLogin(req, res) {
    const data = await AuthServices.doLogin(req.body);
    return res.status(HttpStatus.OK.code).json({
      message: "Login successful",
      data: data,
    });
  }

  static async doLogout(req, res) {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(HttpStatus.UNAUTHORIZED.code).json({
        message: "Missing or malformed Authorization header",
      });
    }
    const access_token = authHeader.split(" ")[1];
    if (!access_token) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ error: "Unauthorized" });
    }

    const result = await AuthServices.doLogout(access_token);
    if (result)
      return res.status(HttpStatus.NO_CONTENT.code).json({
        message: "Logout successful",
      });
  }
}
