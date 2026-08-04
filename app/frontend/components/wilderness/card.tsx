import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";
import { cn } from "@/lib/utils";

const cardVariants = cva("", {
	variants: {
		variant: {
			primary: "bg-card text-card-foreground border",
		},
		size: {
			md: "rounded-xl",
		},
	},
	defaultVariants: {
		variant: "primary",
		size: "md",
	},
});

function Card({
	className,
	variant = "primary",
	size = "md",
	children,
	...props
}: React.ComponentProps<"div"> &
	VariantProps<typeof cardVariants> & {
		children?: React.ReactNode;
	}) {
	return (
		<div className={cn(cardVariants({ variant, size, className }))} {...props}>
			{children}
		</div>
	);
}

function CardHeader({
	className,
	children,
	...props
}: React.ComponentProps<"div"> & {
	children?: React.ReactNode;
}) {
	return (
		<div className={cn("text-lg font-semibold p-4", className)} {...props}>
			{children}
		</div>
	);
}

function CardContent({
	className,
	children,
	...props
}: React.ComponentProps<"div"> & {
	children?: React.ReactNode;
}) {
	return (
		<div className={cn("p-6", className)} {...props}>
			{children}
		</div>
	);
}

export { Card, CardContent, CardHeader };
