import { useQuery } from "@tanstack/react-query";

export const useProfile = () => {
  return useQuery({
    queryKey: [],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/profile/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });
};
