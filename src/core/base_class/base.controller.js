import HttpStatus from "core/constant/http-status";

export class BaseController {
  static service = null;

  static async getAll(_req, res) {
    const data = await this.service.getAll();
    return res.status(HttpStatus.OK.code).json({
      message: HttpStatus.OK.text,
      data: data,
    });
  }

  static async getById(req, res) {
    const data = await this.service.getById(req.params.id);
    return res.status(HttpStatus.OK.code).json({
      message: HttpStatus.OK.text,
      data: data,
    });
  }

  static async create(req, res) {
    console.log(req.body);
    const record = await this.service.create(req.body);
    return res.status(HttpStatus.CREATED.code).json({
      message: HttpStatus.CREATED.text,
      data: record,
    });
  }

  static async update(req, res) {
    const record = await this.service.update(req.params.id, req.body);
    return res.status(HttpStatus.CREATED.code).json({
      message: HttpStatus.CREATED.text,
      data: record,
    });
  }

  static async delete(req, res) {
    await this.service.delete(req.params.id);
    return res.status(HttpStatus.NO_CONTENT.code).json({
      message: HttpStatus.NO_CONTENT.text,
    });
  }
}
