import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useRegister } from "@/modules/auth/hooks/useRegister";

export const Route = createFileRoute("/register")({
  component: RouteComponent,
});

function RouteComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: submitRegister, isPending } = useRegister();

  function handleSubmitForm(event: React.FormEvent) {
    event.preventDefault(); //harus ditambahkan agar halaman tidak refresh
    submitRegister({ email, password });
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <form
        className="w-[320px] p-6 space-y-6 border border-zinc-200 rounded-lg"
        onSubmit={handleSubmitForm}
      >
        <section className="text-center">
          <h3>Sign up</h3>
          <p>Create account to continue</p>
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
            {isPending ? "Registering..." : "Register"}
          </button>
        </section>
        <section>
          <p>
            Have an account? <Link to="/login">Sign In</Link>
          </p>
        </section>
      </form>
    </div>
  );
}
