"use client";

import {
	Button,
	NavigationList,
	NavigationListItem,
} from "@/components/ui/pagination";
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

export const UsersTable = ({
	query,
	currentPage,
}: {
	query: string;
	currentPage: number;
}) => {
	const {
		usersToDisplay,
		currentPageNumber,
		totalPageNumber,
		goOnNextPage,
		goOnPrevPage,
		loading,
		error,
		foundUsers,
	} = useUsers({ query, currentPage });

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
			<Table>
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
				<TableFooter />
			</Table>
			<div className="flex items-center justify-center space-x-4 mt-4">
				<Button
					onClick={goOnPrevPage}
					className="px-4 py-2 rounded hover:bg-gray-300"
				>
					Previous
				</Button>
				<NavigationList className="inline-flex -space-x-px text-sm">
					<NavigationListItem className="flex items-center justify-center w-full px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
						Page {currentPageNumber} of {totalPageNumber}
					</NavigationListItem>
					{/* Add clickable pagelist */}
				</NavigationList>
				<Button
					onClick={goOnNextPage}
					className="px-4 py-2 rounded hover:bg-gray-300"
				>
					Next
				</Button>
			</div>
		</>
	);
};
