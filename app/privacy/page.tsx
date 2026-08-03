import Link from "next/link";
import React from "react";

const sections = [
  {
    id: "01",
    title: "What we collect",
    body: "We collect your name, university email and profile image when you create an account, plus university details when you create a workspace. We store your component request history so you can track borrowing across semesters.",
  },
  {
    id: "02",
    title: "How we use it",
    body: "Your data powers the inventory system itself — approvals, borrowing records, notifications and university-level admin scopes. We never sell your data and never show it outside your university workspace.",
  },
  {
    id: "03",
    title: "Data sharing",
    body: "Component requests and member details are visible only to members and admins of your own university workspace. No third-party analytics track you, and no external service reads your inventory.",
  },
  {
    id: "04",
    title: "Storage & security",
    body: "Data is stored in encrypted databases and transmitted over HTTPS. Passwords are hashed, never stored in plain text, and sessions expire automatically.",
  },
  {
    id: "05",
    title: "Your rights",
    body: "You can request a copy, correction or deletion of your data at any time by emailing hello@chips.campus. Deleting your account removes your profile and personal records from the system.",
  },
  {
    id: "06",
    title: "Contact",
    body: "Questions about this policy? Reach us at hello@chips.campus and we'll respond within one working day.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen mx-auto max-w-6xl w-full flex-col gap-12 py-20 justify-center items-center my-10">
      <div className="flex flex-col gap-6 w-full">
        <span className="border-2 bg-marigold-yellow px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-midnight-ink w-fit">
          Legal
        </span>
        <h1 className="font-degular-display text-5xl font-bold leading-tight tracking-wide text-midnight-ink md:text-6xl">
          Privacy <span className="text-cobalt-blue">Policy</span>
        </h1>
        <p className="text-lg leading-relaxed text-midnight-ink/70">
          Last updated: August 2026. The short version: your data stays inside
          your university workspace, and we never sell it.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {sections.map((section) => (
          <div
            key={section.id}
            className="grid gap-5 border-b-2 border-midnight-ink/10 pb-8 md:grid-cols-[96px_1fr]"
          >
            <span
              className="font-degular-display text-5xl font-bold leading-none"
              style={{ color: section.id === "01" ? "#1457d8" : section.id === "02" ? "#e84522" : "#f5b400" }}
            >
              {section.id}
            </span>
            <div className="flex flex-col gap-3">
              <h2 className="font-degular-display text-2xl font-bold text-midnight-ink">
                {section.title}
              </h2>
              <p className="max-w-2xl text-base leading-relaxed text-midnight-ink/70">
                {section.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/"
        className="flex w-fit items-center gap-2 border-2 border-midnight-ink bg-poppy-red px-8 py-3 text-base font-bold uppercase tracking-wider text-cream-paper transition-colors hover:bg-midnight-ink self-center"
      >
        Back to Home
      </Link>
    </div>
  );
}
