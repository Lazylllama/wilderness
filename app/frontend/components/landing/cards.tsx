import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "../wilderness/card";

//! step by step cards for the landing page
const stepByStep = [
	{
		title: "setup your tent",
		description:
			"sign in & setup camp. your tent is also your workstation so you expand as you go",
	},
	{
		title: "build & log hours",
		description:
			"sign in & setup camp. your tent is also your workstation so you expand as you go",
	},
	{
		title: "submit your offering",
		description:
			"sign in & setup camp. your tent is also your workstation so you expand as you go",
	},
	{
		title: "nuke the tent",
		description:
			"sign in & setup camp. your tent is also your workstation so you expand as you go",
	},
];

export function StepCards() {
	return (
		<>
			{stepByStep.map((_, index) => (
				<StepCard key={index} index={index} />
			))}
		</>
	);
}

function StepCard({ index }: { index: number }) {
	return (
		<Card>
			<CardContent className="p-4 gap-3 flex flex-col">
				<Card className="w-16 aspect-square bg-background text-center text-foreground/30">
					art stuff
				</Card>
				{/* ^ ts just a placeholder cause we got no art... */}
				<p className="text-[14px] tracking-widest font-semibold text-primary font-pixel">
					STEP 0{index + 1}
				</p>
				<div className="flex flex-col pb-4">
					<h3 className="text-[20px] font-bold">{stepByStep[index].title}</h3>
					<p className="text-[13px] text-foreground/70">
						{stepByStep[index].description}
					</p>
				</div>
			</CardContent>
		</Card>
	);
}

//! heat tier cards for the landing page
const heatTierVariants = cva("border", {
	variants: {
		variant: {
			kindling: "bg-card",
			campfire:
				"bg-linear-to-b from-caution-background to-caution-bottom border-caution text-caution-foreground",
			bonfire:
				"bg-linear-to-b from-warning-background to-warning-bottom border-warning text-warning-foreground",
			wildfire:
				"bg-linear-to-b from-destructive-background to-destructive-bottom border-destructive text-destructive-foreground",
		},
	},
	defaultVariants: {
		variant: "kindling",
	},
});

const heatTierDescriptions: Record<string, string> = {
	kindling:
		"a tiny spark, just like a flint a steel, something tiny, short and something.",
	campfire:
		"a tiny spark, just like a flint a steel, something tiny, short and something.",
	bonfire:
		"a tiny spark, just like a flint a steel, something tiny, short and something.",
	wildfire:
		"a tiny spark, just like a flint a steel, something tiny, short and something.",
};

export function HeatTierCards({
	baseHourRate,
	hourMultipliers,
}: {
	baseHourRate: number;
	hourMultipliers: Record<string, number>;
}) {
	return (
		<>
			<HeatTierCard
				variant="kindling"
				hourRate={baseHourRate * (hourMultipliers?.kindling || 1)}
			/>
			<HeatTierCard
				variant="campfire"
				hourRate={baseHourRate * (hourMultipliers?.campfire || 1)}
			/>
			<HeatTierCard
				variant="bonfire"
				hourRate={baseHourRate * (hourMultipliers?.bonfire || 1)}
			/>
			<HeatTierCard
				variant="wildfire"
				hourRate={baseHourRate * (hourMultipliers?.wildfire || 1)}
				isLast
			/>
		</>
	);
}

function HeatTierCard({
	className,
	variant = "kindling",
	hourRate,
	isLast = false,
	...props
}: React.ComponentProps<"div"> &
	VariantProps<typeof heatTierVariants> & {
		children?: React.ReactNode;
		hourRate?: number;
		isLast?: boolean;
	}) {
	return (
		<Card
			data-variant={variant}
			className={cn(heatTierVariants({ variant, className }), "")}
			{...props}
		>
			<CardContent className="text-center">
				<div className="w-16 aspect-square bg-background rounded-xl border mx-auto mb-2 text-sm text-foreground/30">
					more art smh
				</div>
				<p className="font-pixel tracking-widest">
					{variant?.toLocaleUpperCase()}
				</p>
				<p className="font-sans text-[13px]">
					<span className="font-semibold text-[24px]">
						{hourRate?.toFixed(0)}
					</span>{" "}
					logs/hour
				</p>
				<p className="text-foreground/70 text-[13px]">
					{heatTierDescriptions[variant || "kindling"]}
				</p>
				{isLast && <div className="" />}
			</CardContent>
		</Card>
	);
}

//! shop preview cards for the landing page
type itemType = {
	id: number;
	title: string;
	price: number;
	image_url: string;
};

export function ShopPreview({
	items = [],
	averageHourRate,
}: {
	items: Array<itemType>;
	averageHourRate: number;
}) {
	console.log("items", items);
	return (
		<div className="flex flex-row gap-4 overflow-x-auto">
			{items.map((item, index) => (
				<ShopPreviewCard
					key={index}
					item={item}
					averageHourRate={averageHourRate}
				/>
			))}
		</div>
	);
}

function ShopPreviewCard({
	item,
	hourRate,
}: {
	item: itemType;
	hourRate: number;
}) {
	return (
		<Card className="w-48 aspect-square bg-background text-center text-foreground/30">
			<CardHeader className="h-67.5">
				<img
					src={item.image_url}
					alt={item.title}
					className="w-full h-32 object-cover"
				/>
			</CardHeader>
			<CardContent className="flex flex-col gap-2">
				<p className="font-semibold">{item.title}</p>
				<p className="text-[13px] text-foreground/70">
					{item.price} logs ({(item.price / averageHourRate).toFixed(1)} hours)
				</p>
			</CardContent>
		</Card>
	);
}
