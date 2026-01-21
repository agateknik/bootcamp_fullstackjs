import { createFileRoute } from "@tanstack/react-router";
import { FormCard } from "../components/FormCard";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div>
      <FormCard />
    </div>
  );
}
