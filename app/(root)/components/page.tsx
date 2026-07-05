import ComponentList from "@/components/root/ComponentList";
import EmptyComponents from "@/components/root/EmptyComponents";
import { ComponentPagination } from "@/components/root/ComponentPagination";
import { fetchComponents } from "@/lib/actions/component";

export default async function ComponentPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Math.max(1, Number(params.page) || 1);
  const perPage = 6;

  const { components, totalCount } = await fetchComponents(currentPage, perPage);
  const totalPages = Math.ceil(totalCount / perPage);

  if (totalCount === 0) return <EmptyComponents />;

  return (
    <div>
      <ComponentList
        title="All Components"
        components={components}
        containerClassName="my-14"
      />
      <div className="mb-7">
        <ComponentPagination
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
