import Header from "@/components/root/Header";
import Footer from "@/components/root/Footer";
import { ReactNode } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session) redirect("/sign-in");

  return (
    <main className="root-container">
      <div className="mx-auto flex min-h-screen flex-col max-w-7xl">
        <Header session={session} />
        <div className="mt-20 flex-1">{children}</div>
        <Footer />
      </div>
    </main>
  );
}
