import { Input as BaseUIInput } from "@base-ui/react";
import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";
import { cn } from "@/lib/utils";

const inputVariants = cva("", {
	variants: {
		variant: {
			primary: "",
		},
	},
	defaultVariants: {
		variant: "primary",
	},
});

function Input({
	className,
	variant = "primary",
	...props
}: React.ComponentProps<"input"> & VariantProps<typeof inputVariants>) {
	return (
		<BaseUIInput
			data-variant={variant}
			className={cn(
				"bg-card border-border placeholder:text-foreground/50 text-foreground placeholder:text-md",
				"h-12 w-xs border rounded-xl text-xl any-pointer-coarse:text-base",
			)}
			//className={cn(inputVariants({ variant, className }))}
			{...props}
		/>
	);
}

export { Input, type inputVariants };
