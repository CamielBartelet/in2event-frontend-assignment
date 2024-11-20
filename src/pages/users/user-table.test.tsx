import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import UsersPage from "./users-page";
import { UsersTable } from "./users-table";

import { vi } from "vitest";

// Mocking next/navigation
vi.mock("next/navigation", () => ({
	usePathname: () => "/users",
	useRouter: () => ({
		replace: vi.fn(),
	}),
	useSearchParams: () => new URLSearchParams("query=lea"),
}));

test("UsersPage", () => {
	render(<UsersPage />);
	expect(
		screen.getByRole("heading", { level: 1, name: "Users List" })
	).toBeDefined();
	expect(screen.getByRole("searchbox", { name: "Search" })).toBeDefined();
});
