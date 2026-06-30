import { RequestTable } from "@/components/admin/requests/RequestTable";

export default function ComponentRequestsPage() {
  return (
    <section className="w-full rounded-2xl bg-cream-paper p-7">
      <h2 className="text-xl font-semibold">Component Requests</h2>
      <div className="mt-7 w-full overflow-hidden">
        <RequestTable />
      </div>
    </section>
  );
}

