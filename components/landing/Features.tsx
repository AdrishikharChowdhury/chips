import React from "react";

const features = [
  {
    id: "01",
    title: "University Workspaces",
    desc: "Every university gets its own slug-scoped space. Members, components and requests stay isolated — no cross-campus noise.",
    tag: "Multi-tenant",
    accent: "#1457d8",
    shape: "circle",
  },
  {
    id: "02",
    title: "Borrow Request Workflow",
    desc: "Members request components, admins approve or reject. Status flows PENDING → BORROWED → RETURNED with full traceability.",
    tag: "Workflow",
    accent: "#e84522",
    shape: "square",
  },
  {
    id: "03",
    title: "Live Inventory",
    desc: "Available copies update the moment a borrow is approved or a return lands. Everyone sees the same truth.",
    tag: "Realtime",
    accent: "#f5b400",
    shape: "triangle",
  },
  {
    id: "04",
    title: "Admin Analytics",
    desc: "Dashboards chart available copies, pending approvals and usage per component — at a glance, per university.",
    tag: "Insights",
    accent: "#1457d8",
    shape: "square",
  },
  {
    id: "05",
    title: "Group Status Updates",
    desc: "Bulk-approve or return multiple requests at once. No clicking through rows one by one.",
    tag: "Efficiency",
    accent: "#e84522",
    shape: "circle",
  },
  {
    id: "06",
    title: "Member Approvals",
    desc: "University ID cards gate access. Admins approve accounts before anyone can borrow a single board.",
    tag: "Secure",
    accent: "#f5b400",
    shape: "triangle",
  },
];

function Shape({ type, accent }: { type: string; accent: string }) {
  if (type === "circle") {
    return <span className="size-4 rounded-full" style={{ backgroundColor: accent }} />;
  }
  if (type === "triangle") {
    return (
      <span
        className="size-0"
        style={{
          borderLeft: "8px solid transparent",
          borderRight: "8px solid transparent",
          borderBottom: `14px solid ${accent}`,
        }}
      />
    );
  }
  return <span className="size-4" style={{ backgroundColor: accent }} />;
}

export default function Features() {
  return (
    <section id="features" className="h-screen flex justify-center items-center">
      <div className="flex flex-col gap-14 py-24">
      <div className="flex flex-col items-start gap-6">
        <span className="rounded-full bg-marigold-yellow px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-midnight-ink">
          Features
        </span>
        <h2 className="font-degular-display text-4xl font-bold leading-tight tracking-wide text-midnight-ink xs:text-5xl md:text-6xl">
          Everything a campus lab needs,{" "}
          <span className="text-cobalt-blue">in one system</span>
        </h2>
        <p className="text-lg leading-relaxed text-midnight-ink/60 font-semibold ml-4">
          Built for universities that share hardware. Track it, borrow it,
          approve it, and know exactly where every component is.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {features.map((f) => (
          <article
            key={f.id}
            className="group relative flex flex-col gap-5 border-2 border-midnight-ink bg-cream-paper p-8 transition-colors hover:bg-midnight-ink"
          >
            <div className="flex items-start justify-between">
              <span className="font-degular-display text-3xl font-bold text-poppy-red transition-colors group-hover:text-marigold-yellow">
                {f.id}
              </span>
              <span className="flex items-center justify-center gap-1.5 rounded-full border-2 border-midnight-ink px-3 py-1 text-xs font-bold uppercase tracking-wider text-midnight-ink transition-colors group-hover:border-cream-paper group-hover:text-cream-paper">
                {f.tag}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Shape type={f.shape} accent={f.accent} />
              <h3 className="font-degular-display text-2xl font-bold text-midnight-ink transition-colors group-hover:text-cream-paper">
                {f.title}
              </h3>
            </div>

            <p className="text-base leading-relaxed text-midnight-ink/70 transition-colors group-hover:text-cream-paper/70">
              {f.desc}
            </p>
          </article>
        ))}
        </div>
      </div>
    </section>
  );
}
