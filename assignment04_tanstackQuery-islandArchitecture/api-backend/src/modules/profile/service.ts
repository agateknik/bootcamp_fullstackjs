import { prisma } from "../../utils/prisma";
import type { UpdateProfileInput } from "./schema";

export async function getProfile(userId: string) {
	const profile = await prisma.user.findUnique({
		where: { id: userId },
		select: {
			id: true,
			email: true,
			name: true,
			bio: true,
			avatar: true,
			createdAt: true,
		},
	});

	if (!profile) throw new Error("Profile not found");

	return profile;
}

export async function updateProfile(userId: string, data: UpdateProfileInput) {
	return prisma.user.update({
		where: { id: userId },
		data: data,
		select: {
			id: true,
			email: true,
			name: true,
			bio: true,
			avatar: true,
			createdAt: true,
		},
	});
}
