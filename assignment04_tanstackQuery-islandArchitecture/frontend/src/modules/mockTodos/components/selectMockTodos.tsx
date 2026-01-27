import { useMockTodo } from "../hooks/useMockTodo";

export const SelectMockTodos = () => {
  const { data, isLoading } = useMockTodo();

  if (isLoading) {
    return <div className="bg-zinc-50 p-2 animate-pulse">Loading...</div>;
  }

  return (
    <div>
      <span className="font-medium text-2xl">Last five Todos :</span>
      {data?.slice(-5).map((todo) => (
        <div key={todo.id}>
          <h4 className="font-bold">{todo.title}</h4>
          <p>Status: {todo.completed ? "Completed" : "Pending"}</p>
        </div>
      ))}
    </div>
  );
};
