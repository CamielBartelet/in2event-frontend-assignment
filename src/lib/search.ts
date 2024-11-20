import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export interface SearchProps {
	input: string | undefined;
}

export function useHandleSearch() {
	const searchParams = useSearchParams() ?? new URLSearchParams(); //workaround since deprecated typing in docs for URLSearchParams and useSearchParams casting
	const pathname = usePathname();
	const { replace } = useRouter();

	const handleSearch = useDebouncedCallback((input: string) => {
		const params = new URLSearchParams(searchParams);

		if (input) {
			params.set("query", input);
		} else {
			params.delete("query");
		}

		replace(`${pathname}?${params.toString()}`);
	}, 200);

	return handleSearch;
}
