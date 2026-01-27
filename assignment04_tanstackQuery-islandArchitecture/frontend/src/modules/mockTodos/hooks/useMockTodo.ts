import { useQuery } from "@tanstack/react-query";
import type { Todo } from "../utils/Todo";

export const useMockTodo = () => {
  return useQuery<Todo[]>({
    queryKey: ["mock-todos"],
    queryFn: async () => {
      const res = await fetch("http://localhost:8000/mock-todos?throttle=true");
      const data = await res.json();
      return data;
    },
  });
};
