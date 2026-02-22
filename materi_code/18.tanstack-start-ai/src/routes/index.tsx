import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { createNote, getNotes } from "@/modules/todos/server-fn";

export const Route = createFileRoute("/")({
	component: App,
	loader: async () => {
		const data = await getNotes();
		return data ?? [];
	},
});

function App() {
	const data = Route.useLoaderData();
	const router = useRouter();
	const [content, setContent] = useState("");

	async function handleCreateNote() {
		await createNote({ data: { input: content } });
		setContent("");
		router.invalidate();
	}

	return (
		<div>
			<section className="space-x-2 ml-4">
				<input
					className="border-2 border-cyan-300 rounded-md w-auto h-8 p-4"
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>
				<button
					className="mt-5 ml-5 w-20 h-10 bg-cyan-600 hover:bg-cyan-800 rounded-lg"
					type="button"
					onClick={handleCreateNote}
				>
					Add note
				</button>
			</section>
			<section className="mt-4 ml-4 space-y-2">
				<h2 className="font-bold">Notes:</h2>
				{data.map((note) => (
					<div key={note.id} className="p-2 border rounded w-100">
						{note.content}
					</div>
				))}
			</section>
		</div>
	);
}
