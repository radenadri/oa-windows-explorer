import { Elysia } from "elysia";
import { folderRoutes } from "./routes/folders";
import { cors } from "@elysiajs/cors";

const APP_PORT = process.env.APP_PORT || 3000;

const app = new Elysia()
  .use(cors())
  .get("/", () => 'Hello from windows explorer backend!')
  .use(folderRoutes)
  .listen(APP_PORT);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
