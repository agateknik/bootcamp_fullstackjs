import { createFileRoute } from "@tanstack/react-router";
import { MockTodos } from "@/modules/mockTodos/components/mockTodos";
import { SelectMockTodos } from "@/modules/mockTodos/components/selectMockTodos";
import { Profile } from "@/modules/profile/components/profile";
import { useProfile } from "@/modules/profile/hooks/useProfile";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const { data } = useProfile();
  return (
    <div>
      <header className="flex justify-between p-4 bg-zinc-100 border-b">
        <div>Todos</div>
        <Profile />
      </header>
      <h3>This is your Todos : {data?.data.email}</h3>
      <div className="grid grid-cols-2">
        <MockTodos />
        <SelectMockTodos />
      </div>
    </div>
  );
}
