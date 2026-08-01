import { Button as BaseUIButton } from "@base-ui/react";
import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva("rounded-xl text-xl", {
	variants: {
		variant: {
			primary:
				"bg-linear-to-b from-primary to-primary-bottom text-primary-foreground border-b-4 border-primary-shadow font-semibold",
			secondary:
				"bg-secondary text-secondary-foreground border-b-4 border-secondary-shadow font-semibold",
			outline: "border font-medium text-foreground",
			link: "text-foreground",
		},
		size: {
			md: "py-2.5 px-3.5",
			lg: "px-5 py-3.5",
		},
	},
	defaultVariants: {
		variant: "primary",
		size: "md",
	},
});

function Button({
	className,
	variant = "primary",
	size = "md",
	children,
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		children: React.ReactNode;
	}) {
	return (
		<BaseUIButton
			data-variant={variant}
			data-size={size}
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		>
			{children}
		</BaseUIButton>
	);
}

export { Button, buttonVariants };
