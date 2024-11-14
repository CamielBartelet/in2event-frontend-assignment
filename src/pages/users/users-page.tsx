import SearchBar from "@/components/ui/searchBar";
import { UsersTable } from "./users-table";
import { Suspense } from "react";
// import Pagination from "@/components/ui/pagination";

export default async function UsersPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {

  const searchParams = await props.searchParams;
  const query = searchParams?.query?.toLocaleLowerCase() || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="container p-4">
      <h1 className="text-2xl font-bold mb-4">Users List</h1>
      <SearchBar searchPlaceholder={query}/>
      <Suspense key={query + currentPage} fallback={<p>Loading... </p>}>
        <UsersTable query={query} currentPage={currentPage}/>
      </Suspense>
    </div>
  );
}
