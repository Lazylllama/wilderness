import { cn } from "@/lib/utils";

export function SectionWrapper({ children }: { children?: React.ReactNode }) {
	return <div className="max-w-7xl px-8 mx-auto pt-3.5">{children}</div>;
}

export function SectionContent({
	children,
	className,
}: {
	children?: React.ReactNode;
	className?: string;
}) {
	return <div className={cn("py-4", className)}>{children}</div>;
}

export function SectionHeading({
	id,
	title,
	subtitle,
	className,
	...props
}: {
	id: string;
	title: string;
	subtitle: string;
	className?: string;
}) {
	return (
		<div id={id} className={`flex flex-col gap-2 ${className}`} {...props}>
			<h2 className="text-4xl font-bold">{title}</h2>
			<p className="text-[14px] text-foreground">{subtitle}</p>
		</div>
	);
}
