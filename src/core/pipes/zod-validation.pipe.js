import HttpStatus from "core/constant/http-status";

export class ZodValidation {
  /**
   * @type {import("zod").ZodObject<any>}
   */
  validator = null;
  ctx = [];

  constructor(dto, ctx) {
    this.validator = dto;
    this.ctx = ctx;
  }

  async validate() {
    const [req, res, next] = this.ctx;
    try {
      const validateData = await this.validator.parseAsync(req.body);
      req.body = validateData;
      next();
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).json({
        message: error,
      });
    }
  }
}
