import { eq } from "drizzle-orm";
import Elysia from "elysia";
import { db } from "src/config/database";
import { folders } from "src/models/folder";
import { buildTree } from "src/utils/buildTree";

export const folderRoutes = new Elysia({ prefix: "/api/v1/folders" })
  .get("/", async () => {
    const allData = await db.select().from(folders);

    return buildTree(allData);
  })
  .get("/:id/child", async ({ params }) => {
    const children = await db
      .select()
      .from(folders)
      .where(eq(folders.parentId, Number(params.id)));

    return children;
  })
