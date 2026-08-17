import { useMemo } from "react";
import { Trees } from "@/components/trees";
import { depthScale, depthZ, FIRE } from "@/lib/camp-layout";
import { cn } from "@/lib/utils";
import { Fireflies } from "./fireflies";
import { Ground } from "./ground";

export function CampObject({
	x,
	y,
	children,
	className,
	style,
}: {
	x: number;
	y: number;
	children: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
}) {
	return (
		<div
			className={cn("absolute", className)}
			style={{
				left: `${x}%`,
				top: `${y}%`,
				zIndex: depthZ(y),
				transform: `translate(-56.7%, -100%) scale(${depthScale(y)})`,
				transformOrigin: "56.7% 100%",
				...style,
			}}
		>
			{children}
		</div>
	);
}

function Stars() {
	const stars = useMemo(
		() =>
			Array.from({ length: 60 }).map(() => ({
				id: crypto.randomUUID(),
				left: `${Math.random() * 100}%`,
				top: `${Math.random() * 42}%`,
				size: Math.random() < 0.8 ? 2 : 3,
				opacity: 0.25 + Math.random() * 0.6,
				delay: `${Math.random() * 5}s`,
			})),
		[],
	);

	return (
		<div className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-700 group-data-night/stage:opacity-100">
			{stars.map((star) => (
				<span
					key={star.id}
					className="absolute animate-twinkle rounded-full bg-foreground"
					style={{
						left: star.left,
						top: star.top,
						width: star.size,
						height: star.size,
						opacity: star.opacity,
						animationDelay: star.delay,
					}}
				/>
			))}
		</div>
	);
}

export function CampStage({
	night,
	glow,
	// children,
}: {
	night: boolean;
	glow: number;
	// children: React.ReactNode;
}) {
	return (
		<div
			data-night={night || undefined}
			className={cn(
				"group/stage relative isolate w-full overflow-hidden rounded-3xl border",
				"aspect-16/9 min-h-[540px] max-h-[calc(100dvh-7rem)]",
				"bg-linear-to-b from-[#33402c] via-[#2a3722] to-card transition-colors duration-700",
				"data-night:from-night-blue data-night:via-[#1c2a22] data-night:to-card",
			)}
		>
			<Stars />
			<div className="pointer-events-none absolute inset-x-0 bottom-[42%] -z-10 origin-bottom scale-[0.55] opacity-45 blur-[1.5px]">
				<Trees count={44} />
			</div>
			<Ground />
			<div className="pointer-events-none absolute inset-x-0 bottom-[-4%] z-20 origin-bottom scale-90 opacity-90">
				<Trees count={26} />
			</div>
			<div
				className="pointer-events-none absolute inset-0 z-30 mix-blend-screen transition-opacity duration-1000"
				style={{
					opacity: glow,
					background: `radial-gradient(ellipse 46% 42% at ${FIRE.x}% ${FIRE.y}%, rgba(244,169,78,0.30) 0%, rgba(232,129,60,0.12) 45%, transparent 67%)`,
				}}
			/>
			<Fireflies />
		</div>
	);
}
