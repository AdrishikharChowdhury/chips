import Link from "next/link";
import React from "react";

const sections = [
  {
    id: "01",
    title: "Acceptance of terms",
    body: "By creating a CHIPS account or workspace you agree to these terms. If you are setting up inventory on behalf of a university, you confirm that you have the authority to do so.",
  },
  {
    id: "02",
    title: "Your account",
    body: "You are responsible for keeping your account credentials secure and for all activity under your account. One person owns each university workspace and decides who gets member or admin access.",
  },
  {
    id: "03",
    title: "University workspaces",
    body: "Workspaces are slug-scoped — each university gets its own isolated inventory. Workspace owners control members, component approvals and borrows. CHIPS is not liable for how a workspace is administered.",
  },
  {
    id: "04",
    title: "Acceptable use",
    body: "Use CHIPS for its intended purpose: tracking physical components within your campus. Do not upload unlawful content, impersonate others, exploit the system, or attempt to access another university's workspace.",
  },
  {
    id: "05",
    title: "Limitation of liability",
    body: "CHIPS is provided as-is. We work to keep inventory accurate, but we are not liable for lost, damaged or delayed components, campus-specific borrowing disputes, or any hardware stored off-campus.",
  },
  {
    id: "06",
    title: "Termination",
    body: "You can stop using CHIPS — delete your account anytime. We may suspend workspaces that violate these terms and endanger other universities.",
  },
  {
    id: "07",
    title: "Contact",
    body: "Questions about the terms? Reach us at hello@chips.campus and we will respond within one working day.",
  },
];

export default function TermsPage() {
  return (
    <div className="flex min-h-screen mx-auto max-w-6xl w-full flex-col gap-12 py-20 justify-center items-center my-10">
      <div className="flex flex-col gap-6 w-full">
        <span className="border-2 bg-marigold-yellow px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-midnight-ink w-fit">
          Legal
        </span>
        <h1 className="font-degular-display text-5xl font-bold leading-tight tracking-wide text-midnight-ink md:text-6xl">
          Terms of <span className="text-cobalt-blue">Service</span>
        </h1>
        <p className="text-lg leading-relaxed text-midnight-ink/70">
          Last updated: August 2026. By using CHIPS you agree to the conditions below.
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
