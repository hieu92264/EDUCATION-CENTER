import { faker, fi, PhoneModule } from "@faker-js/faker";
import { DatabaseModule } from "database/database.module";
import { UserModel } from "modules/user/user.model";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export class UserSeed {
  static async run() {
    try {
      const data = await Promise.all(
        Array.from({ length: 15 }, async () => {
          return {
            fullname: faker.person.fullName(),
            email: faker.internet.email(),
            password: await bcrypt.hash("123456", 10),
            address: faker.location.streetAddress(),
            phone_number: faker.phone.number(),
            dob: faker.date.birthdate(),
          };
        })
      );

      // Chèn dữ liệu vào cơ sở dữ liệu
      await UserModel.insertMany(data);
      console.log("User seed successful");
    } catch (error) {
      console.log("user seed error:>>> ", error.message);
    }
  }
}
