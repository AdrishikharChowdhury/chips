import { auth } from "@/auth";
import { db } from "@/database";
import { usersTable } from "@/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import EditProfileForm from "@/components/profile/EditProfileForm";

export default async function EditProfilePage() {
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
    <EditProfileForm
      user={{
        id: u.id,
        fullName: u.fullName,
        email: u.email,
        universityId: u.universityId,
        universityCard: u.universityCard,
      }}
    />
  );
}
