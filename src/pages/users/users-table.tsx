"use client";

import { Button } from "@/components/ui/pagination";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
	TableFooter,
} from "@/components/ui/table";
import { useUsers } from "@/services/use-users";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { DataTable } from "simple-datatables";

export const UsersTable = ({
	query,
	currentPage,
}: {
	query: string;
	currentPage: number;
}) => {
	const {
		users,
		usersToDisplay,
		currentPageNumber,
		goOnNextPage,
		goOnPrevPage,
		loading,
		error,
		foundUsers,
	} = useUsers({ query, currentPage });

	const pathname = usePathname();

	const tableRef = useRef<HTMLTableElement>(null);
	const dataTableInstance = useRef<DataTable | null>(null);

	useEffect(() => {
		if (loading || error) {
			return;
		}
		// Initialize a DataTable if the path is /usersVariant as alternative to old table
		if (
			tableRef.current &&
			!dataTableInstance.current &&
			pathname === "/usersVariant"
		) {
			dataTableInstance.current = new DataTable(tableRef.current, {
				paging: true,
				perPage: 3,
				perPageSelect: [1, 2, 3],
				sortable: false,
			});
		} else {
			return;
		}

		// Cleanup on component unmount
		return () => {
			if (dataTableInstance.current) {
				dataTableInstance.current.destroy();
				dataTableInstance.current = null;
			}
		};
	}, [loading, error]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	if (foundUsers) {
		return <div>{foundUsers}</div>;
	}

	return (
		<>
			<Table ref={tableRef}>
				<TableCaption>A list of users.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">ID</TableHead>
						<TableHead>Name</TableHead>
						<TableHead>Username</TableHead>
						<TableHead>Email</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{usersToDisplay.map((user) => (
						<TableRow key={user.id}>
							<TableCell className="font-medium">{user.id}</TableCell>
							<TableCell>{user.name}</TableCell>
							<TableCell>{user.username}</TableCell>
							<TableCell>{user.email}</TableCell>
						</TableRow>
					))}
				</TableBody>
				<TableFooter>{currentPageNumber}</TableFooter>
			</Table>
			<Button
				onClick={goOnPrevPage}
				className="px-4 py-2 rounded hover:bg-gray-300"
			>
				Previous
			</Button>
			<Button
				onClick={goOnNextPage}
				className="px-4 py-2 rounded hover:bg-gray-300"
			>
				Next
			</Button>
		</>
	);
};
