import { Button as BaseUIButton } from "@base-ui/react";
import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"rounded-lg text-xl flex flex-row items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
	{
		variants: {
			variant: {
				primary:
					"bg-linear-to-b from-primary to-primary-bottom text-primary-foreground shadow-[0_4px_0_0_var(--color-primary-shadow)] font-semibold hover:translate-y-1 disabled:hover:translate-y-0 hover:shadow-[0_0px_0_0_var(--color-primary-shadow)] disabled:hover:shadow-[0_4px_0_0_var(--color-primary-shadow)] active:translate-y-1 active:shadow-[0_0px_0_0_var(--color-primary-shadow)] transition-all",
				secondary:
					"bg-secondary text-secondary-foreground shadow-[0_4px_0_0_var(--color-secondary-shadow)] font-semibold hover:translate-y-1 disabled:hover:translate-y-0 hover:shadow-[0_0px_0_0_var(--color-secondary-shadow)] disabled:hover:shadow-[0_4px_0_0_var(--color-secondary-shadow)] active:translate-y-1 active:shadow-[0_0px_0_0_var(--color-secondary-shadow)] transition-all",
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
	},
);

function Button({
	className,
	variant = "primary",
	size = "md",
	children,
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		children?: React.ReactNode;
	}) {
	return (
		<BaseUIButton
			data-variant={variant}
			data-size={size}
			className={cn(buttonVariants({ variant, size, className }), "")}
			{...props}
		>
			{children}
		</BaseUIButton>
	);
}

export { Button, buttonVariants };
