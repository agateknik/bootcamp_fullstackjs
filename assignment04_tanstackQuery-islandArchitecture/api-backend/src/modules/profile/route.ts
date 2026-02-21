import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import {
  type AuthVariables,
  authMiddleware,
} from "../../middleware/authMiddleware";
import { updateProfileSchema } from "./schema";
import { getProfile, updateProfile } from "./service";

export const profile = new Hono<{ Variables: AuthVariables }>()
  .use("*", authMiddleware)
  .get("/me", async (c) => {
    const user = c.get("user");
    try {
      const profile = await getProfile(user.id);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return c.json({ success: true, data: profile });
    } catch (error) {
      throw new HTTPException(404, {
        message: error instanceof Error ? error.message : "Profile not found",
      });
    }
  })
  .put("/me", zValidator("json", updateProfileSchema), async (c) => {
    const user = c.get("user");
    const data = c.req.valid("json");
    try {
      const profile = await updateProfile(user.id, data);
      return c.json({ success: true, data: profile });
    } catch (error) {
      console.error(error);
      throw new HTTPException(400, { message: "Failed to update profile" });
    }
  });
