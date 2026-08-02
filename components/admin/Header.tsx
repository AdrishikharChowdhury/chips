"use client";
import { Session } from "next-auth";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";

export default function Header({session}:{session:Session}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <header className="admin-header">
      <div>
        <h2 className="text-2xl font-semibold sm:text-4xl">Welcome, {session?.user?.name}</h2>
        <p className="text-slate-500 text-lg">Monitor all of your users and components here</p>
      </div>
      {pathname !== "/admin" && (
        <Input
          className="w-fit py-6 rounded-2xl pl-4 placeholder:text-midnight-ink/60 border-midnight-ink/50 border-2 bg-cream-paper"
          placeholder="Search"
          defaultValue={searchParams.get("search") || ""}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const value = e.currentTarget.value.trim();
              router.push(`${pathname}${value ? `?search=${encodeURIComponent(value)}` : ""}`);
            }
          }}
        />
      )}
    </header>
  );
}