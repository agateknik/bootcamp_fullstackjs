import { Dashboard } from "@/components/dashboard";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { createFileRoute } from "@tanstack/react-router";
import { useHydrateAtoms } from "jotai/utils";
import { userAtom } from "@/atoms/userAtom";

export const Route = createFileRoute("/admin")({
  component: RouteComponent,
  loader: () => {
    //ambil data dari API

    return {
      username: "apman",
    };
  },
});

function RouteComponent() {
  const data = Route.useLoaderData();

  useHydrateAtoms([[userAtom, { username: data.username }]]);
  return (
    <>
      <div>This admin page</div>
      <main className="h-screen">
        <Header />
        <div className="flex h-full">
          <Sidebar />
          <Dashboard />
        </div>
      </main>
    </>
  );
}
