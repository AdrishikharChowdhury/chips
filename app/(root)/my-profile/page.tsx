import { auth, signOut } from "@/auth";
import { db } from "@/database";
import { borrowRecords, componentsTable, usersTable } from "@/database/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
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

  const { id: userId } = session.user;

  const rows = await db
    .select({
      id: borrowRecords.id,
      borrowDate: borrowRecords.borrowDate,
      dueDate: borrowRecords.dueDate,
      status: borrowRecords.status,
      componentId: borrowRecords.componentId,
      componentTitle: componentsTable.title,
      componentManufacturer: componentsTable.manufacturer,
      componentCover: componentsTable.cover,
      componentType: componentsTable.type,
    })
    .from(borrowRecords)
    .innerJoin(
      componentsTable,
      eq(borrowRecords.componentId, componentsTable.id),
    )
    .where(eq(borrowRecords.userId, userId))
    .orderBy(borrowRecords.createdAt)
    .limit(3);

  const records = rows.reduce<
    Record<
      string,
      Omit<(typeof rows)[number], "borrowDate"> & {
        borrowDate: Date | null;
        count: number;
      }
    >
  >((acc, row) => {
    const key = row.componentId;
    if (!acc[key]) {
      acc[key] = { ...row, count: 0 };
    }
    acc[key].count += 1;
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-7xl space-y-10 py-10">
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
            <form
              action={async () => {
                "use server";
                redirect("/my-profile/edit");
              }}
            >
              <Button className="font-degular-display text-xl py-6 w-fit px-4">
                {" "}
                <Edit /> Edit
              </Button>
            </form>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <Button className="font-degular-display text-xl py-6 w-fit px-4 bg-poppy-red hover:bg-poppy-red/80">
                Sign out
              </Button>
            </form>
          </div>
        </div>
      </div>
      <section className="w-full space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-semibold">Your Components</h2>
          {Object.keys(records).length > 0 && (
            <Link
              href="/components/borrow"
              className="text-sm font-semibold text-cobalt-blue hover:underline"
            >
              View all
            </Link>
          )}
        </div>
        {Object.keys(records).length === 0 ? (
          <p className="text-center text-4xl text-midnight-ink/20 mt-6">
            No Borrowed Components Yet
          </p>
        ) : (
          <div className="grid gap-4">
            {Object.values(records).map((record) => {
              const typeArray = record.componentType?.split("/") ?? [];
              return (
                <div
                  key={record.id}
                  className="flex items-center gap-4 rounded-2xl border-2 border-midnight-ink/10 bg-cream-paper p-4"
                >
                  <div className="relative flex size-36 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-midnight-ink/5">
                    {record.componentCover ? (
                      <Image
                        src={record.componentCover}
                        alt={record.componentTitle ?? ""}
                        width={144}
                        height={144}
                        className="size-full object-cover"
                      />
                    ) : (
                      <div className="size-10 rounded-full bg-midnight-ink/10" />
                    )}
                    {record.count > 1 && (
                      <span className="absolute -right-2 -top-2 flex size-7 items-center justify-center rounded-full border-2 border-cream-paper bg-cobalt-blue text-xs font-bold text-white">
                        ×{record.count}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col gap-0.5">
                    <Link
                      href={`/components/${record.componentId}`}
                      className="text-lg font-bold text-midnight-ink hover:text-cobalt-blue"
                    >
                      {record.componentTitle}
                    </Link>
                    <p className="text-sm text-midnight-ink/60">
                      {record.componentManufacturer}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-0.5">
                      {typeArray.map((t, i) => (
                        <span
                          key={i}
                          className="rounded-full border border-cobalt-blue/30 bg-cobalt-blue/10 px-2 py-0.5 text-xs font-semibold text-cobalt-blue"
                        >
                          {t.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-xs font-semibold text-midnight-ink/40 uppercase tracking-wider">
                        Due
                      </p>
                      <p className="text-sm font-bold text-midnight-ink">
                        {record.dueDate
                          ? new Date(record.dueDate).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })
                          : "—"}
                      </p>
                    </div>
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        record.status === "BORROWED"
                          ? "bg-marigold-yellow/30 text-midnight-ink"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {record.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
