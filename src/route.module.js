import express from "express";

export class RouteModule {
  static async init({ prefix, app }) {
    try {
      const router = express.Router();
      const routes = await Promise.all([
        //import route each module from here...
        import("./modules/auth/auth.route"),
        import("./modules/user/user.route"),
        import("./modules/categories/category.route"),
        import("./modules/course/course.route"),
        import("./modules/class/class.route"),
      ]);
      routes.forEach((route) => {
        router.use(route.default.register());
      });

      app.use(prefix, router);

      console.log("Router module init successful");
    } catch (error) {
      console.log("Router module error:>>> ", error.message);
    }
  }
}
