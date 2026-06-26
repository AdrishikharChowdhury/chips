import Header from "@/components/root/Header";
import Footer from "@/components/root/Footer";
import { ReactNode } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { db } from "@/database";
import { usersTable } from "@/database/schema";
import { eq } from "drizzle-orm";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/sign-in");

  after(async () => {
    if (!session?.user?.id) return;

    //get the user if the last activity was today

    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, session?.user?.id))
      .limit(1);

    if (user[0]?.lastActivityDate === new Date().toISOString().slice(0, 10)) return;

    await db
      .update(usersTable)
      .set({ lastActivityDate: new Date().toISOString().slice(0, 10) })
      .where(eq(usersTable.id, session?.user?.id));
  });

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
