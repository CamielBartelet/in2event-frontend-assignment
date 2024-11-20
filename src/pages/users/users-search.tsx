"use client";
import { SearchBar } from "@/components/ui/search";
import { useHandleSearch } from "@/lib/search";

export interface SearchProps {
	searchPlaceholder: string | undefined;
}

export const UsersSearch = ({ searchPlaceholder }: SearchProps) => {
	const handleSearch = useHandleSearch();

	const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		handleSearch(e.target.value);
	};
	return (
		<div className="w-full max-w-md">
			<SearchBar
				type="search"
				placeholder={searchPlaceholder?.toString()}
				className="search-cancel:cursor-pointer peer block min-h-[auto] w-full rounded bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 py-[0.32rem] pl-10 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
				onChange={onSearchChange}
			/>
		</div>
	);
};
