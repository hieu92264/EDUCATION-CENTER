import createHttpError from "http-errors";

export class BaseServices {
  static model = null;
  static nameModule = "";
  static populateFields = [];

  static async getAll() {
    let query = this.model.find({});
    if (this.populateFields.length) {
      this.populateFields.forEach((field) => {
        query = query.populate(field);
      });
    }
    return await query;
  }

  static async getById(id) {
    let query = this.model.findById(id);
    if (this.populateFields.length) {
      this.populateFields.forEach((field) => {
        query = query.populate(field);
      });
    }

    const record = await query;
    if (!record) throw createHttpError.NotFound(`${this.nameModule} not found`);
    return record;
  }

  static async create(data) {
    let record = await this.model.create(data);
    if (!record)
      throw createHttpError.BadRequest(`Failed to create ${this.nameModule}`);

    // populate sau khi tạo
    if (this.populateFields.length) {
      record = await record.populate(this.populateFields);
    }

    return record;
  }

  static async update(id, data) {
    let record = await this.model.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!record) throw createHttpError.NotFound(`${this.nameModule} not found`);

    // populate sau khi update
    if (this.populateFields.length) {
      record = await record.populate(this.populateFields);
    }

    return record;
  }

  static async delete(id) {
    const record = await this.model.findByIdAndDelete(id);
    if (!record) throw createHttpError.NotFound(`${this.nameModule} not found`);
    return record;
  }
}
