import { useLogin } from "@/modules/auth/hooks/useLogin";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: submitLogin, isPending } = useLogin();

  function handleSubmitForm(event: React.FormEvent) {
    event.preventDefault(); //harus ditambahkan agar halaman tidak refresh
    submitLogin({ email, password });
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <form
        className="w-[320px] p-6 space-y-6 border border-zinc-200 rounded-lg"
        onSubmit={handleSubmitForm}
      >
        <section className="text-center">
          <h3>Sign in</h3>
          <p>Log in to continue</p>
        </section>
        <section className="space-y-2">
          <input
            type="email"
            placeholder="email@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button disabled={isPending} type="submit">
            {isPending ? "Logging in..." : "Login"}
          </button>
        </section>
        <section>
          <p>
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </section>
      </form>
    </div>
  );
}
