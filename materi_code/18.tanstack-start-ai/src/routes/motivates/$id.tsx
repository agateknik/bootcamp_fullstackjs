import { createFileRoute, Link } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import { getMotivateById } from "@/modules/motivate/server-fn";

export const Route = createFileRoute("/motivates/$id")({
	component: RouteComponent,
	loader: ({ params }) => getMotivateById({ data: { id: Number(params.id) } }),
});

function RouteComponent() {
	const motivate = Route.useLoaderData();
	if (!motivate) {
		return <div>Data not found bro ...</div>;
	}
	return (
		<div className="max-w-2xl m-auto my-12 space-y-4">
			<div className="prose">
				<ReactMarkdown>{motivate.content}</ReactMarkdown>
			</div>
			<Link
				to="/motivate"
				className="bg-gray-800 text-white w-auto p-2 rounded-md"
			>
				Back
			</Link>
		</div>
	);
}
