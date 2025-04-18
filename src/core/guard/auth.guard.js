import HttpStatus from "core/constant/http-status";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { UserTokenModel } from "modules/auth/auth.model";

export class AuthGuard {
  static async isAuth(req, res, next) {
    try {
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

      const istoken = await UserTokenModel.findOne({
        access_token: access_token,
      });

      if (!istoken) {
        return res.status(HttpStatus.UNAUTHORIZED.code).json({
          message: "Invalid or expired token",
        });
      }

      const decode = await jwt.verify(access_token, process.env.JWT_SECRET);
      req.user = decode;
      next();
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
        .send({ error: error.message });
    }
  }

  static hasRole(roles) {
    return (req, res, next) => {
      try {
        const user = req.user;
        if (roles.includes(user.role)) {
          return next();
        }
        return res.status(HttpStatus.FORBIDDEN.code).json({
          message: "You do not have permission",
        });
      } catch (error) {
        return res.status(HttpStatus.FORBIDDEN.code).json({
          message: "Invalid role",
        });
      }
    };
  }
}
