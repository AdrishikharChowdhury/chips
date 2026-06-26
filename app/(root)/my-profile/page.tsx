import { auth, signOut } from "@/auth";
import { db } from "@/database";
import { usersTable } from "@/database/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import { redirect } from "next/navigation";
import { CalendarDays, IdCard, Activity, User, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function MyProfilePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/sign-in");
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, session.user.id))
    .limit(1);
  if (!user.length) redirect("/sign-in");

  const u = user[0];

  return (
    <div className="mx-auto max-w-4xl space-y-10 py-10">
      <div className="flex items-center gap-4">
        <div className="flex size-20 items-center justify-center rounded-full bg-cobalt-blue text-3xl font-bold text-cream-paper p-8">
          {u.fullName.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-midnight-ink">{u.fullName}</h1>
          <p className="text-lg text-midnight-ink/60">{u.email}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 bg-[#fffef9] border-2 border-midnight-ink/20 shadow-xl">
        <div className="space-y-6 p-6">
          <h2 className="text-xl font-bold text-midnight-ink">
            University ID Card
          </h2>
          <div className="flex items-center justify-center overflow-hidden rounded-xl border-2 border-midnight-ink/10">
            <Image
              src={u.universityCard}
              width={400}
              height={280}
              alt="University ID Card"
              className="size-full object-cover"
            />
          </div>
        </div>
        <div className="p-6 flex flex-col justify-between">
          <div className="space-y-6 p-6">
            <h2 className="text-xl font-bold text-midnight-ink">
              Account Details
            </h2>
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <IdCard size={20} className="text-cobalt-blue" />
                <div className="flex items-center gap-2">
                  <p className="text-sm text-midnight-ink/50">University ID:</p>
                  <p className="text-lg font-bold text-midnight-ink">
                    {u.universityId}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Activity size={20} className="text-cobalt-blue" />
                <div className="flex items-center gap-2">
                  <p className="text-sm text-midnight-ink/50">Status:</p>
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-sm font-bold ${
                      u.status === "APPROVED"
                        ? "bg-emerald-100 text-emerald-800"
                        : u.status === "REJECTED"
                          ? "bg-poppy-red/20 text-poppy-red"
                          : "bg-marigold-yellow/30 text-midnight-ink"
                    }`}
                  >
                    {u.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <User size={20} className="text-cobalt-blue" />
                <p className="text-sm text-midnight-ink/50">Role:</p>
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-bold ${
                    u.role === "ADMIN"
                      ? "bg-cobalt-blue/20 text-cobalt-blue"
                      : "bg-midnight-ink/10 text-midnight-ink"
                  }`}
                >
                  {u.role}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CalendarDays size={20} className="text-cobalt-blue" />
                <div>
                  <p className="text-sm text-midnight-ink/50">Last Activity</p>
                  <p className="text-lg font-bold text-midnight-ink">
                    {u.lastActivityDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CalendarDays size={20} className="text-cobalt-blue" />
                <div>
                  <p className="text-sm text-midnight-ink/50">Member Since</p>
                  <p className="text-lg font-bold text-midnight-ink">
                    {u.createdAt
                      ? new Date(u.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex self-center gap-6">
            <form action={async () => {
              "use server"
              redirect("/my-profile/edit")
            }} >
              <Button  className="font-degular-display text-xl py-6 w-fit px-4">
                {" "}
                <Edit /> Edit
              </Button>
            </form>
            <form action={async () => {
              "use server"
              await signOut()
            }} >
            <Button
              className="font-degular-display text-xl py-6 w-fit px-4 bg-poppy-red hover:bg-poppy-red/80"
            >
              Sign out
              </Button>
            </form>
          </div>
        </div>
      </div>
      <section className="w-full">
        <p className="text-3xl font-semibold">Your Components:</p>
        <p className="text-center text-4xl text-midnight-ink/20 mt-6">
          No Borrowed Components Yet
        </p>
      </section>
    </div>
  );
}
