import { Input as BaseUIInput } from "@base-ui/react";
import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";
import { cn } from "@/lib/utils";

const inputVariants = cva(
	"h-12 w-xs border rounded-lg text-xl any-pointer-coarse:text-base",
	{
		variants: {
			variant: {
				primary:
					"bg-card border-border placeholder:text-foreground/50 text-foreground placeholder:text-md",
			},
		},
		defaultVariants: {
			variant: "primary",
		},
	},
);

function Input({
	className,
	variant = "primary",
	...props
}: React.ComponentProps<"input"> & VariantProps<typeof inputVariants>) {
	return (
		<BaseUIInput
			data-variant={variant}
			className={cn(inputVariants({ variant, className }))}
			{...props}
		/>
	);
}

export { Input, type inputVariants };
