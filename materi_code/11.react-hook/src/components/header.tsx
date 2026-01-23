import { useAtomValue } from "jotai";
import { Avatar } from "./ui/avatar";
import { userAtom } from "@/atoms/userAtom";

export const Header = () => {
  const userData = useAtomValue(userAtom);
  return (
    <header className="flex justify-between bg-black text-white p-5">
      <div className="font-medium text-2xl">Sweetcodes</div>
      <div className="flex gap-2 items-center">
        <div>{userData.username}</div>
        <Avatar username={userData.username} />
      </div>
    </header>
  );
};
