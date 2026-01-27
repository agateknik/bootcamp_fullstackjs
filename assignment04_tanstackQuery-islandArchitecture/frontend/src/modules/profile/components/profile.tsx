import { useProfile } from "../hooks/useProfile";
import { Loader } from "lucide-react";

export const Profile = () => {
  const { data, isLoading } = useProfile();

  if (isLoading) {
    return <Loader className="animate-spin" />;
  }
  return <div>{data.data.email}</div>;
};
