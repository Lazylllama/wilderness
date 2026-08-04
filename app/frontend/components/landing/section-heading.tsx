export function SectionHeading({
	title,
	subtitle,
	className,
	...props
}: {
	title: string;
	subtitle: string;
	className?: string;
}) {
	return (
		<div className={`flex flex-col gap-2 ${className}`} {...props}>
			<h2 className="text-4xl font-bold">{title}</h2>
			<p className="text-[14px] text-foreground">{subtitle}</p>
		</div>
	);
}
