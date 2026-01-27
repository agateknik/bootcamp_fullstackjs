import { useMutation } from "@tanstack/react-query";
import type { RegisterSchema } from "../utils/Register";
import { toast } from "react-hot-toast";
import { useNavigate } from "@tanstack/react-router";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: [],
    mutationFn: async ({ email, password }: RegisterSchema) => {
      const res = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to login");
      }
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.data.accessToken);
      toast.success("Login successful. Redirecting...");
      setTimeout(() => {
        navigate({ to: "/" });
      }, 500);
    },
    onError: (err) => {
      if (err instanceof Error) {
        toast.error(err.message);
        return;
      }
      const error = err as { error: string };
      toast.error(error.error);
    },
  });
};
