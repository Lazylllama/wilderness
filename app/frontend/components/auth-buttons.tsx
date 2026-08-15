import type { VariantProps } from "class-variance-authority";
import type React from "react";
import { Button, type buttonVariants } from "@/components/wilderness/button";
import { csrfToken } from "@/lib/csrf";

type AuthButton = React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		children?: React.ReactNode;
	};

export function LoginButton({
	children,
	variant = "primary",
	className,
	...props
}: AuthButton) {
	return (
		<form action="/auth/hack_club" method="post" className="contents">
			<input type="hidden" name="authenticity_token" value={csrfToken()} />
			<Button type="submit" variant={variant} className={className} {...props}>
				{children}
			</Button>
		</form>
	);
}

export function LogoutButton({
	children,
	variant = "link",
	className,
	...props
}: AuthButton) {
	return (
		<form action="/logout" method="post" className="contents">
			<input type="hidden" name="_method" value="delete" />
			<input type="hidden" name="authenticity_token" value={csrfToken()} />
			<Button type="submit" variant={variant} className={className} {...props}>
				{children}
			</Button>
		</form>
	);
}
