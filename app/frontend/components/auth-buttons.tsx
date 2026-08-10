import type React from "react";
import { Button } from "@/components/wilderness/button";
import { csrfToken } from "@/lib/csrf";

type AuthButton = {
	children: React.ReactNode;
	variant?: "primary" | "secondary" | "outline" | "link";
	className?: string;
};

export function LoginButton({
	children,
	variant = "primary",
	className,
}: AuthButton) {
	return (
		<form action="/auth/hack_club" method="post" className="contents">
			<Button type="submit" variant={variant} className={className}>
				{children}
			</Button>
		</form>
	);
}

export function LogoutButton({
	children,
	variant = "link",
	className,
}: AuthButton) {
	return (
		<form action="/logout" method="post" className="contents">
			<input type="hidden" name="_method" value="delete" />
			<input type="hidden" name="authenticity_token" value={csrfToken()} />
			<Button type="submit" variant={variant} className={className}>
				{children}
			</Button>
		</form>
	);
}
