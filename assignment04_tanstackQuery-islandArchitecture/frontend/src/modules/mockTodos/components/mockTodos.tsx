import { useMockTodo } from "../hooks/useMockTodo";

export const MockTodos = () => {
  const { data, isLoading } = useMockTodo();

  if (isLoading) {
    return <div className="bg-zinc-50 p-2 animate-pulse">Loading...</div>;
  }

  return (
    <div>
      {data?.map((todo) => (
        <div key={todo.id}>
          <h4 className="font-bold">{todo.title}</h4>
          <p>Status: {todo.completed ? "Completed" : "Pending"}</p>
        </div>
      ))}
    </div>
  );
};
