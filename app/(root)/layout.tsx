import Navbar from "@/components/landing/Navbar";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <main className="root-container">
      <div className="mx-auto flex min-h-screen flex-col max-w-7xl">
        <Navbar />
        <div className="mt-20 flex-1">{children}</div>
      </div>
    </main>
  );
}
