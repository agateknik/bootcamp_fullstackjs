import { prisma } from "../../utils/prisma";
import type { CreateTodoInput, UpdateTodoInput } from "./schema";

export async function createTodo(data: CreateTodoInput) {
	return prisma.todo.create({
		data,
		select: {
			id: true,
			title: true,
			completed: true,
			userId: true,
			createdAt: true,
		},
	});
}

export async function getTodos(userId?: string) {
	return prisma.todo.findMany({
		where: userId ? { userId } : undefined,
		select: {
			id: true,
			title: true,
			completed: true,
			userId: true,
			createdAt: true,
		},
	});
}

export async function updateTodo(id: string, data: UpdateTodoInput) {
	return prisma.todo.update({
		where: { id },
		data,
		select: {
			id: true,
			title: true,
			completed: true,
			userId: true,
			createdAt: true,
		},
	});
}

export async function deleteTodo(id: string) {
	return prisma.todo.delete({
		where: { id },
		select: { id: true },
	});
}
