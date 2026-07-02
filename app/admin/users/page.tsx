import { AccountsTable } from "@/components/admin/users/AccountsTable"

export default function UsersPage() {
  return (
    <section className="w-full rounded-2xl bg-cream-paper p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Accounts</h2>
      </div>
      <div className="mt-7 w-full overflow-hidden">
        <AccountsTable />
      </div>
    </section>
  );
}
