import HttpStatus from "core/constant/http-status";
import createHttpError from "http-errors";

export function useExceptionFilter(executionHandler) {
  return async (req, res, next) => {
    try {
      return await executionHandler(req, res, next);
    } catch (error) {
      if (createHttpError.isHttpError(error)) {
        return res.status(error.statusCode).json({
          message: error.message,
          statuscode: error.statusCode,
          stack: error.stack,
        });
      }

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).json({
        message: error.message,
      });
    }
  };
}
