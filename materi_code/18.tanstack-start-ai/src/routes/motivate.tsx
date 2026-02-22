import { createFileRoute, Link } from "@tanstack/react-router";
import { get } from "http";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createMotivate, getMotivates } from "@/modules/motivate/server-fn";

export const Route = createFileRoute("/motivate")({
	component: RouteComponent,
	loader: async () => {
		return getMotivates();
	},
});

function RouteComponent() {
	const motivates = Route.useLoaderData();

	const [problem, setProblem] = useState("");
	const [result, setResult] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	async function handleCreateMotivate() {
		setIsLoading(true);
		try {
			const res = await createMotivate({
				data: {
					problem: problem,
				},
			});
			setResult(res);
		} catch (error) {
			setResult("error give motivate:" + error);
		} finally {
			setIsLoading(false);
			setProblem("");
		}
	}

	return (
		<div className="max-w-2xl m-auto space-y-4 my-12">
			<section className="space-y-4">
				<div>
					<h3 className="font-semibold font-mono text-2xl tracking-tight">
						Need motivated or tips in your life ?
						<p className="text-gray-400 text-sm">
							input your problem below ...
						</p>
					</h3>
				</div>
				<Textarea
					value={problem}
					placeholder="What's problem, you want to solved"
					onChange={(e) => setProblem(e.target.value)}
				></Textarea>
				<Button onClick={handleCreateMotivate} disabled={isLoading}>
					{" "}
					Create
				</Button>
			</section>
			<section>
				{isLoading ? (
					<span className="animate-pulse text-gray-600">
						Generating motivate ...
					</span>
				) : (
					<div className="prose">
						<ReactMarkdown>{result}</ReactMarkdown>
					</div>
				)}
			</section>
			<section className="space-y-2">
				{motivates.map((motivate) => {
					return (
						<Link
							to="/motivates/$id"
							key={motivate.id}
							params={{ id: String(motivate.id) }}
						>
							<div className="border rounded p-4 my-2">
								<h4 className="font-bold font-mono uppercase">
									{motivate.problem}
								</h4>
								<p className="text-sm text-zinc-500">
									{motivate.content.slice(0, 200)}...
								</p>
							</div>
						</Link>
					);
				})}
			</section>
		</div>
	);
}
