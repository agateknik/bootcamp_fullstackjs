import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { RegisterSchema } from "@/modules/auth/utils/Register";
import { useNavigate } from "@tanstack/react-router";
import { api } from "@/utils/api";

export const useRegister = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: [],
    mutationFn: async ({ email, password }: RegisterSchema) => {
      // const res = await fetch("http://localhost:8000/auth/register", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ email, password }),
      // });
      // const data = await res.json();
      // return data;
      const res = await api
        .post("auth/register", {
          json: { email, password },
        })
        .json();
      return res;
    },
    onSuccess: () => {
      toast.success("Registration successful , please login now !");
      navigate({ to: "/login" });
    },
  });
};
