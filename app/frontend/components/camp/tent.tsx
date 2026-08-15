import {
	firelight,
	formatHours,
	HEAT_TIERS,
	jitter,
	plotFor,
} from "@/lib/camp-layout";
import { cn } from "@/lib/utils";
import type { Tent } from "@/types/camp";
import { TentArt } from "./art";
import { CampObject } from "./stage";

export function CampTent({
	tent,
	onOpen,
}: {
	tent: Tent;
	onOpen: (tent: Tent) => void;
}) {
	const plot = plotFor(tent.plot_index);
	const x = plot.x + jitter(tent.id);
	const y = plot.y + jitter(tent.id + 99, 0.8);
	const tier = HEAT_TIERS[tent.heat_tier];
	const lit = 0.55 + firelight(x, y) * 0.45;
	return (
		<CampObject x={x} y={y}>
			<button
				type="button"
				onClick={() => onOpen(tent)}
				aria-label={`${tent.name}, ${formatHours(tent.hours)} logged, ${tier.label}`}
				className={cn(
					"group flex w-[clamp(6.5rem,11vw,10rem)] cursor-pointer flex-col items-center",
					"transition-transform duration-200 hover:-translate-y-1.5 focus-visible:-translate-y-1.5",
					"outline-none",
				)}
			>
				<TentArt
					flag={tier.flag}
					className={cn(
						"w-full drop-shadow-[0_6px_10px_rgba(0,0,0,0.45)] transition-all",
						"group-hover:drop-shadow-[0_10px_18px_rgba(244,169,78,0.35)]",
						"group-focus-visible:drop-shadow-[0_10px_18px_rgba(244,169,78,0.67)]",
					)}
					style={{ filter: `brightness(${lit})` }}
				/>
				<span className="mt-1 text-center text-sm/tight font-semibold text-foreground drop-shadow-[0_2px_3px_rgba(0,0,0,0.867)]">
					{tent.name}
				</span>
				<span className="font-serif text-xs text-foreground/60">
					{formatHours(tent.hours)} · {tier.label}
				</span>
				{tent.status === "shipped" && (
					<span className="mt-0.5 rounded-full border border-pill-border bg-pill-background px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-pill-foreground">
						shipped
					</span>
				)}
			</button>
		</CampObject>
	);
}
