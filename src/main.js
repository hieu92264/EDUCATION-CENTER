import express from "express";
import "dotenv/config";
import { DatabaseModule } from "database/database.module";
import { RouteModule } from "route.module";

const bootstrap = async () => {
  const app = express();
  const HOST = process.env.HOST || "127.0.0.1";
  const PORT = process.env.PORT || 3000;

  app.use(express.json());
  app.use(express.urlencoded());

  await Promise.all([
    DatabaseModule.init(),
    RouteModule.init({ prefix: "/v1/api", app }),
  ]);

  app.listen(PORT, () => {
    console.log(`app listen on http://${HOST}:${PORT}`);
  });
};

bootstrap();
