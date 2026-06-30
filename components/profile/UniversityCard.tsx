import Image from "next/image";
import { CalendarDays, IdCard, Activity, User, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";
import { redirect } from "next/navigation";

interface UniversityCardProps {
  universityCard: string;
  universityId: number;
  status: string;
  role: string;
  lastActivityDate: string | null;
  createdAt: Date | null;
}

export function UniversityCard({
  universityCard,
  universityId,
  status,
  role,
  lastActivityDate,
  createdAt,
}: UniversityCardProps) {
  return (
    <div className="grid md:grid-cols-2 bg-[#fffef9] border-2 border-midnight-ink/20 shadow-xl">
      <div className="space-y-6 p-6">
        <h2 className="text-xl font-bold text-midnight-ink">
          University ID Card
        </h2>
        <div className="flex items-center justify-center overflow-hidden rounded-xl border-2 border-midnight-ink/10">
          <Image
            src={universityCard}
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
                  {universityId}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Activity size={20} className="text-cobalt-blue" />
              <div className="flex items-center gap-2">
                <p className="text-sm text-midnight-ink/50">Status:</p>
                <span
                  className={`inline-block rounded-full px-3 py-1 text-sm font-bold ${
                    status === "APPROVED"
                      ? "bg-emerald-100 text-emerald-800"
                      : status === "REJECTED"
                        ? "bg-poppy-red/20 text-poppy-red"
                        : "bg-marigold-yellow/30 text-midnight-ink"
                  }`}
                >
                  {status}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <User size={20} className="text-cobalt-blue" />
              <p className="text-sm text-midnight-ink/50">Role:</p>
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-bold ${
                  role === "ADMIN"
                    ? "bg-cobalt-blue/20 text-cobalt-blue"
                    : "bg-midnight-ink/10 text-midnight-ink"
                }`}
              >
                {role}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <CalendarDays size={20} className="text-cobalt-blue" />
              <div>
                <p className="text-sm text-midnight-ink/50">Last Activity</p>
                <p className="text-lg font-bold text-midnight-ink">
                  {lastActivityDate}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CalendarDays size={20} className="text-cobalt-blue" />
              <div>
                <p className="text-sm text-midnight-ink/50">Member Since</p>
                <p className="text-lg font-bold text-midnight-ink">
                  {createdAt
                    ? new Date(createdAt).toLocaleDateString("en-US", {
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
        <div className="flex justify-center gap-6 p-6">
          <form
            action={async () => {
              "use server";
              redirect("/my-profile/edit");
            }}
          >
            <Button className="font-degular-display text-xl py-6 w-fit px-4">
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
  );
}
