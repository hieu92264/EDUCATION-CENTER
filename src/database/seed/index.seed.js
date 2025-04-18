const { DatabaseModule } = require("database/database.module");
const { CategorySeed } = require("./category.seed");
const { UserSeed } = require("./user.seed");
const { default: mongoose } = require("mongoose");

(async () => {
  try {
    await DatabaseModule.init();
    await Promise.all([UserSeed.run(), CategorySeed.run()]);
    console.log("Seed successful");
  } catch (error) {
    await mongoose.connection.close();
    console.log("seed error:>>> ", error.message);
  } finally {
    await mongoose.connection.close();
  }
})();
