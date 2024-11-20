import * as React from "react";

import { cn } from "@/lib/utils";

const Button = React.forwardRef<
	HTMLButtonElement,
	React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
	<button ref={ref} className={cn("w-1/12 text-sm", className)} {...props} />
));
Button.displayName = "Button";

const NavigationList = React.forwardRef<
	HTMLUListElement,
	React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
	<ul ref={ref} className={cn("w-2/12", className)} {...props} />
));

const NavigationListItem = React.forwardRef<
	HTMLLIElement,
	React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
	<li ref={ref} className={cn("w-2/12 text-sm", className)} {...props} />
));

// const Page = ....etc.

export { Button, NavigationList, NavigationListItem };
