import { userAtom } from "@/atoms/userAtom";
import { useAtomValue } from "jotai";

export const Sidebar = () => {
  const userData = useAtomValue(userAtom);
  return (
    <div className="h-full text-white w-[300px] bg-purple-800">
      <div>Dashboard</div>
      <div>Course</div>
      <div>Bootcamp</div>
      <div>Setting : {userData.username}</div>
    </div>
  );
};
