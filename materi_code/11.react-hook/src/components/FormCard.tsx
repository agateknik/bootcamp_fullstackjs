import { useEffect, useState } from "react";

export const FormCard = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (username === "admin" && password === "admin") {
      setIsAdmin(true);
    }
  }, [username, password]);

  return (
    <div className="flex justify-center item-center h-screen">
      <div className="w-300px space-y-4">
        <h2 className="text-center text-3xl mb-10">Form Register</h2>
        <input
          className="p-2 rounder-lg border"
          name="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <p>Username: {username}</p>
        <input
          type="password"
          className="p-2 rounder-lg border"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <p>Password: {password}</p>
        <div className="text-3xl text-red-500">
          {isAdmin ? "welcome Admin" : null}
        </div>
      </div>
    </div>
  );
};
