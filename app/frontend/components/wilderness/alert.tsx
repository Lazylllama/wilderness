import { cva, type VariantProps } from "class-variance-authority";
import { FlameIcon, type LucideIcon, XIcon } from "lucide-react";
import type React from "react";
import { cn } from "@/lib/utils";

const inputVariants = cva(
	"rounded-xl border-2 relative overflow-clip w-fit max-w-xl",
	{
		variants: {
			variant: {
				normal:
					"bg-linear-to-t to-card-background from-secondary-foreground border-secondary text-secondary",
				warning:
					"bg-linear-to-t to-warning-bottom from-warning-background border-warning text-warning",
				destructive:
					"bg-linear-to-t to-destructive-bottom from-destructive-background border-destructive text-destructive",
			},
		},
		defaultVariants: {
			variant: "normal",
		},
	},
);

function Alert({
	className,
	title,
	description,
	icon: Icon,
	variant = "normal",
	...props
}: React.ComponentProps<"div"> &
	VariantProps<typeof inputVariants> & {
		description?: string;
		icon: LucideIcon;
	}) {
	return (
		<div
			data-variant={variant}
			className={cn(inputVariants({ variant, className }), "")}
			{...props}
		>
			<div className="flex flex-row gap-2 items-start p-4 px-6 pr-14">
				<div className="size-6">
					<Icon size={24} className="mt-1" />
				</div>
				<div className="flex flex-col pb-8">
					<h1 className="text-[20px] font-semibold">{title}</h1>
					<p className="italic">{description}</p>
				</div>
			</div>
			<button
				type="button"
				className="absolute top-0 right-0 p-5 cursor-pointer"
			>
				<XIcon size={20} strokeWidth={3} />
			</button>
			<FlameIcon
				size={64}
				strokeWidth={1}
				className="-bottom-2 -left-3 absolute rotate-34"
			/>
			<FlameIcon
				size={64}
				strokeWidth={1}
				className="-bottom-2 -right-3 absolute -rotate-34"
			/>
		</div>
	);
}

export { Alert, type inputVariants };
