import { faker } from "@faker-js/faker";
import { DatabaseModule } from "database/database.module";
import { CategoryModel } from "modules/categories/category.model";

export class CategorySeed {
  static async run() {
    try {
      const generatedNames = new Set();

      const data = [];

      while (data.length < 10) {
        const name = faker.commerce.department();
        if (!generatedNames.has(name)) {
          generatedNames.add(name);
          data.push({
            name,
            description: faker.commerce.productDescription(),
          });
        }
      }
      await CategoryModel.deleteMany({});
      await CategoryModel.insertMany(data);
      console.log("category seed successful");
    } catch (error) {
      console.log("error in category seed:>>> ", error.message);
    }
  }
}
