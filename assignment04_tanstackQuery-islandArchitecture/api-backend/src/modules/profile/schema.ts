import { z } from "zod";

export const updateProfileSchema = z.object({
	email: z.email().optional(),
	name: z.string().optional(),
	bio: z.string().optional(),
	avatar: z.url().optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
