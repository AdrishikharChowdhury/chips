import { ApprovalAnimation } from "@/components/lottie/ApprovalAnimation";
import { db } from "@/database";
import { usersTable } from "@/database/schema";
import { desc, eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";

export default async function AllUsersCard() {
  const allUsers = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.status, "APPROVED"))
    .limit(4)
    .orderBy(desc(usersTable.createdAt));
  return (
    <section className="bg-cream-paper py-10 px-12 flex flex-col gap-4 rounded-2xl">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-2xl font-semibold mb-2">All Users</h2>
        <Link
          className="text-cobalt-blue font-semibold underline hover:text-cobalt-blue/80"
          href="/admin/users"
        >
          View All
        </Link>
      </div>
      {allUsers.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <ApprovalAnimation label="user" />
          <span className="text-midnight-ink/50 text-xl capitalize font-degular-display -mt-4">
            No User found
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-2 grid-rows-2 gap-6">
          {allUsers.map((user, index) => (
            <div
              key={index}
              className="bg-marigold-yellow/10 py-8 px-4 flex flex-col items-center gap-8 rounded-2xl border-2 border-cobalt-blue"
            >
              <Image
                src={user.universityCard}
                alt={user.fullName}
                width={100}
                height={100}
                className="rounded-full aspect-square object-cover border-4 border-poppy-red"
              />
              <div className="flex flex-col items-center gap-2">
                <span className="text-midnight-ink text-xl capitalize font-degular-display w-full text-center">
                  {user.fullName.split(" ")[0]} {user.fullName.split(" ")[1].split("")[0]}.
                </span>
                <span
                  className={`text-white text-sm font-degular-display py-2 ${user.role === "ADMIN" ? "bg-poppy-red" : "bg-emerald-700"} px-4 rounded-4xl`}
                >
                  {user.role}
                </span>
                <article className="text-midnight-ink text-sm font-degular-display flex gap-2 items-center">
                  <span className="text-cobalt-blue" >Created At:</span>{" "}
                  <span>{user.createdAt?.toISOString().slice(0, 10)}</span>
                </article>
                
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
