import { User } from "@/schemas/user";
import { useState, useEffect } from "react";

const useUsers = ({
	query,
	currentPage,
}: {
	query: string;
	currentPage: number;
}) => {
	const [users, setUsers] = useState<User[]>([]);
	const [foundUsers, setUsersFound] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [currentPageNumber, setCurrentPage] = useState(currentPage);
	const [usersToDisplay, setUsersToDisplay] = useState<User[]>([]);
	const TOTAL_VALUES_PER_PAGE = 3;

	const goOnPrevPage = () => {
		if (currentPageNumber === 1) return;
		setCurrentPage((prev) => prev - 1);
	};
	const goOnNextPage = () => {
		if (currentPageNumber >= users.length / TOTAL_VALUES_PER_PAGE) return;
		setCurrentPage((prev) => prev + 1);
	};

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await fetch(
					"https://jsonplaceholder.typicode.com/users"
				);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				const filteredUsers = data.filter(
					(user: User) =>
						user.name.toLowerCase().includes(query.toLowerCase()) ||
						user.email.toLowerCase().includes(query.toLowerCase())
				);
				setUsers(filteredUsers);
				if (filteredUsers.length === 0) {
					setUsersFound("No users found matching your search.");
				} else {
					setUsersFound("");
				}
			} catch {
				setError("Failed to fetch users");
			} finally {
				setLoading(false);
			}
		};

		fetchUsers();
	}, [currentPageNumber]);

	useEffect(() => {
		const start = (currentPageNumber - 1) * TOTAL_VALUES_PER_PAGE;
		const end = currentPageNumber * TOTAL_VALUES_PER_PAGE;
		setUsersToDisplay(users.slice(start, end));
	}, [users]);

	return {
		users,
		usersToDisplay,
		currentPageNumber,
		goOnNextPage,
		goOnPrevPage,
		loading,
		error,
		foundUsers,
	};
};

export { useUsers };
