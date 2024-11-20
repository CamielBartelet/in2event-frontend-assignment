import * as React from "react";

import { cn } from "@/lib/utils";

const SearchBar = React.forwardRef<
	HTMLInputElement,
	React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
	<div className="relative flex flex-1 flex-shrink-0">
		<label htmlFor="search" className="sr-only">
			Search
		</label>
		<div className="absolute inset-y-0 start-0 flex items-center ps-2">
			<svg
				className="w-4 h-4 text-gray-500 dark:text-gray-400"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 20 20"
			>
				<path
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
				/>
			</svg>
		</div>
		<input
			id="search"
			ref={ref}
			className={cn("w-2/4 text-sm", className)}
			{...props}
		/>
	</div>
));
SearchBar.displayName = "SearchBar";

export { SearchBar };
