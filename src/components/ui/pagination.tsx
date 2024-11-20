import * as React from "react";

import { cn } from "@/lib/utils";

const Button = React.forwardRef<
	HTMLButtonElement,
	React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
	<button ref={ref} className={cn("w-1/12 text-sm", className)} {...props} />
));
Button.displayName = "Button";

// const Page = ....etc.

export { Button };
