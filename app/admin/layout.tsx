import { auth } from "@/auth";
import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/Sidebar";
import { db } from "@/database";
import { usersTable } from "@/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
  }

  const { id } = session?.user;

  const isAdmin = await db
    .select({ isAdmin: usersTable.role })
    .from(usersTable)
    .where(eq(usersTable.id, id)).limit(1);

  if (isAdmin[0]?.isAdmin !== "ADMIN") {
    redirect("/");
  }

  return (
    <main className="admin flex min-h-screen w-full flex-row">
      <Sidebar session={session} />
      <div className="admin-container">
        <Header session={session} />
        {children}
      </div>
    </main>
  );
}
