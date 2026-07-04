import { RequestTable } from "@/components/admin/requests/RequestTable";

export default async function ComponentRequestsPage(props: { searchParams?: Promise<{ search?: string }> }) {
  const searchParams = await props.searchParams;
  const searchQuery = searchParams?.search;
  return (
    <section className="w-full rounded-2xl bg-cream-paper p-7">
      <h2 className="text-xl font-semibold">Component Requests</h2>
      <div className="mt-7 w-full overflow-hidden">
        <RequestTable searchQuery={searchQuery} />
      </div>
    </section>
  );
}

