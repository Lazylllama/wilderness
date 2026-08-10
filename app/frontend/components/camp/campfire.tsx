import { FIRE, FIRE_STATES, formatHours } from "@/lib/camp-layout";
import type { Camp } from "@/types/camp";
import { CampfireArt } from "./art";
import { CampObject } from "./stage";
export function Campfire({ camp, isOpen }: { camp: Camp; onOpen: () => void }) {
	return (
		<CampObject x={FIRE.x} y={FIRE.y}>
			<button
				type="button"
				onClick={onOpen}
				aria-label={`the fire is ${state.label}. open stories around the fire`}
				className="group flex cursor-pointer flex-col items-center outline-none"
			>
				<CampfireArt
					className="w-[clamp(4rem,7vw,6.7rem)] origin-bottom transition-transform duration-500 group-hover:scale-105"
					style={{ transform: `scale(${state.flame})` }}
				/>
				<span className="mt-2 whitespace-nowrap font-serif text-sm text-foreground]/70 drop-shadow-[0_2px_3px_rgba(0,0,0,0.867)">
					the fire is{" "}
					<span className="font-bold text-primary">{state.label}</span> ·{" "}
					{formatHours(camp.total_hours)} burned
				</span>
				<span className="text-xs text-foreground/0 transition-colors group-hover:text-foreground/50 group-focus-visible:text-foreground/50">
					stories around the fire →
				</span>
			</button>
		</CampObject>
	);
}
