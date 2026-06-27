"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { updateProfile } from "@/lib/actions/auth";
import { Edit } from "lucide-react";
import Link from "next/link";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import ImageUpload from "@/components/auth/ImageUpload";

interface EditProfilePageProps {
  user: {
    id: string;
    fullName: string;
    email: string;
    universityId: number;
    universityCard: string;
  };
}

export default function EditProfileForm({ user: u }: EditProfilePageProps) {
  const router = useRouter();
  const { update } = useSession();
  const [fullName, setFullName] = useState(u.fullName);
  const [universityId, setUniversityId] = useState(String(u.universityId));
  const [universityCard, setUniversityCard] = useState(u.universityCard);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(u.id, {
      fullName,
      universityId: Number(universityId),
      universityCard,
    });
    await update({ name: fullName });
    router.push("/my-profile");
    router.refresh();
    console.log(u);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-10 py-10">
      <Link
        href="/my-profile"
        className="inline-flex items-center gap-2 text-sm text-midnight-ink/60 transition-colors hover:text-cobalt-blue"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M10 12L6 8L10 4" />
        </svg>
        Back to Profile
      </Link>

      <div className="rounded-2xl border-2 border-midnight-ink/10 bg-[#fffef9] p-8">
        <div className="mb-8 flex items-center gap-3">
          <Edit size={24} className="text-cobalt-blue" />
          <h1 className="text-2xl font-bold text-midnight-ink">Edit Profile</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-7">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
              <FieldContent>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="form-input"
                  required
                />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <FieldContent>
                <input
                  id="email"
                  type="email"
                  value={u.email}
                  className="form-input cursor-not-allowed opacity-60"
                  disabled
                />
                <FieldDescription>Email cannot be changed</FieldDescription>
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="universityId">University ID</FieldLabel>
              <FieldContent>
                <input
                  id="universityId"
                  type="number"
                  value={universityId}
                  onChange={(e) => setUniversityId(e.target.value)}
                  className="form-input"
                  required
                />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="universityCard">
                University ID Card
              </FieldLabel>
              <FieldContent>
                <ImageUpload
                  onUpload={(url) => setUniversityCard(url)}
                  value={universityCard}
                />
              </FieldContent>
            </Field>
          </FieldGroup>

          <div className="flex gap-4 pt-2">
            <button
              type="submit"
              className="inline-flex min-h-12 items-center gap-2 rounded-none border-2 border-cobalt-blue bg-cobalt-blue px-6 font-degular-display text-lg font-bold text-cream-paper transition-colors hover:bg-cobalt-blue/90"
            >
              <Edit size={18} />
              Save Changes
            </button>
            <Link
              href="/my-profile"
              className="inline-flex min-h-12 items-center gap-2 rounded-none border-2 border-midnight-ink/20 px-6 font-degular-display text-lg font-bold text-white transition-colors bg-poppy-red"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
