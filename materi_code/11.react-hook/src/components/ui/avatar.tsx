interface AvatarProps {
  username: string;
}

export const Avatar = ({ username }: AvatarProps) => {
  return (
    <div className="flex size-8 bg-purple-600 text-white font-medium justify-center items-center">
      <div>{username.slice(0, 2)}</div>
    </div>
  );
};
