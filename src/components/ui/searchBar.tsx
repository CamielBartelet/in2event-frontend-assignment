'use client';
 
// import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation'; // Use next/navigation if desired: newer package, more features, more powerful than next/router
import { useDebouncedCallback } from 'use-debounce';

export interface SearchProps{
    searchPlaceholder: string | undefined;
  }
 
const SearchBar = ({ searchPlaceholder} : SearchProps) => {

    const searchParams = useSearchParams() ?? new URLSearchParams(); //workaround since deprecated typing in docs for URLSearchParams and useSearchParams casting
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((input: string) => {
        console.log(`Searching... ${input}`);

        const params = new URLSearchParams(searchParams);

        if (input) {
            params.set('query', input);
        } else {
            params.delete('query');
        }

        replace(`${pathname}?${params.toString()}`);
    }, 200);

    return (
    <div className="relative flex flex-1 flex-shrink-0">
        <label htmlFor="search" className="sr-only">
            Search
        </label>
        <input
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
            placeholder={searchPlaceholder?.toString()}
            onChange={(e) => {
                handleSearch(e.target.value);
            }}
            defaultValue={searchParams?.get('query')?.toString()}
        />
        {/* <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
    </div>
    );
}

export default SearchBar;