import { createServerFn } from "@tanstack/react-start";
import { openai } from "@/utils/openai";
import { prisma } from "@/utils/prisma";

const SYSTEM_PROMPT = `
    You are greate motivator for everyone has a problem and you always crafting good tips to help everyone has spirit to solved the problem.

    <example_output>
    # [Problem] with bold

    [Tips or motivate content] make list, maximum 3 point

    </example_output>

    <guidelines>
    - Write tips and motivate in indonesian language
    - Always give maximum 3 tips or motivate
    - Make it can make everyone spirit again
    </guidelines>
`;
export const createMotivate = createServerFn({ method: "POST" })
	.inputValidator((data: { problem: string }) => data)
	.handler(async ({ data }) => {
		console.log(data.problem);

		const res = await openai.chat.completions.create({
			model: "google/gemini-2.5-flash-lite",
			messages: [
				{ role: "system", content: SYSTEM_PROMPT },
				{ role: "user", content: data.problem },
			],
		});
		const result = res.choices[0].message.content;

		if (result) {
			await prisma.motivate.create({
				data: {
					problem: data.problem,
					content: result,
				},
			});
		}
		return result ?? "no response";
	});

export const getMotivates = createServerFn().handler(async () => {
	return await prisma.motivate.findMany();
});

export const getMotivateById = createServerFn({ method: "GET" })
	.inputValidator((data: { id: number }) => data)
	.handler(async ({ data }) => {
		return await prisma.motivate.findFirst({
			where: {
				id: data.id,
			},
		});
	});
