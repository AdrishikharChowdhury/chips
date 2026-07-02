import { AccountRequestTable } from "@/components/admin/accountrequests/AccountRequestTable"

export default function AccountRequestsPage() {
  return (
    <section className="w-full rounded-2xl bg-cream-paper p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Account Requests</h2>
        <p>Sorted by </p>
      </div>
      <div className="mt-7 w-full overflow-hidden">
        <AccountRequestTable />
      </div>
    </section>
  );
}
