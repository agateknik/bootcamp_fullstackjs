import { userAtom } from "@/atoms/userAtom";
import { useAtomValue } from "jotai";

export const Dashboard = () => {
  const userData = useAtomValue(userAtom);
  return (
    <div className="flex-1 p-4">
      <div className="text-3xl text-red-950">
        Welcome back, {userData.username} !
      </div>
    </div>
  );
};
