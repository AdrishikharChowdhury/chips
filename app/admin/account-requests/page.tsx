import { AccountRequestTable } from "@/components/admin/accountrequests/AccountRequestTable"

export default async function AccountRequestsPage(props: { searchParams?: Promise<{ search?: string }> }) {
  const searchParams = await props.searchParams;
  const searchQuery = searchParams?.search;
  return (
    <section className="w-full rounded-2xl bg-cream-paper p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Account Requests</h2>
        <p>Sorted by </p>
      </div>
      <div className="mt-7 w-full overflow-hidden">
        <AccountRequestTable searchQuery={searchQuery} />
      </div>
    </section>
  );
}
