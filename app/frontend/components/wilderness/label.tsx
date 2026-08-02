import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";
import { cn } from "@/lib/utils";

const inputVariants = cva("", {
	variants: {
		variant: {
			primary: "",
		},
		size: {
			md: "",
		},
	},
	defaultVariants: {
		variant: "primary",
		size: "md",
	},
});

function Label({
	className,
	variant = "primary",
	size = "md",
	children,
	...props
}: React.ComponentProps<"label"> &
	VariantProps<typeof inputVariants> & {
		children: React.ReactNode;
	}) {
	return (
		// biome-ignore lint/a11y/noLabelWithoutControl: takes in children gng
		<label
			data-variant={variant}
			data-size={size}
			className={cn(
				"font-bold text-foreground",
				"text-sm",
				"flex flex-col items-start gap-1",
			)}
			//className={cn(inputVariants({ variant, size, className }))}
			{...props}
		>
			{children}
		</label>
	);
}

export { type inputVariants, Label };
