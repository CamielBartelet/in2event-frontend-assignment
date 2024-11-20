import { UsersTable } from "./users-table";
import { Suspense } from "react";
import { UsersSearch } from "./users-search";

export default function UsersPage(props: {
	searchParams?: {
		query?: string;
		page?: string;
	};
}) {
	const searchParams = props?.searchParams || {};
	const query = searchParams.query?.toLocaleLowerCase() || "";
	const currentPage = Number(searchParams.page) || 1;

	return (
		<div className="container p-4">
			<h1 className="text-2xl font-bold mb-4">Users List</h1>
			<UsersSearch searchPlaceholder={query} />
			<Suspense key={query + currentPage} fallback={<p>Loading... </p>}>
				<UsersTable query={query} currentPage={currentPage} />
			</Suspense>
		</div>
	);
}
