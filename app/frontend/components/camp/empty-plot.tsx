import { plotFor } from "@/lib/camp-layout";
import { PlotArt } from "./art";
import { CampObject } from "./stage";
export function EmptyPlot({
	plotIndex,
	onPitch,
}: {
	plotIndex: number;
	onPitch: (plotIndex: number) => void;
}) {
	const plot = plotFor(plotIndex);
	return (
		<CampObject x={plot.x} y={plot.y}>
			<button
				type="button"
				onClick={() => onPitch(plotIndex)}
				className="group flex w-[clamp(6.5rem,11vw,10rem)] cursor-pointer flex-col items-center text-foreground/30 outline-none transition-colors hover:text-foreground/60 focus-visible:text-foreground/60"
			>
				<PlotArt className="w-full" />
				<span className="mt-1 text-sm font-semibold text-foreground/60 transition-colors group-hover:text-foreground">
					pitch a tent
				</span>
				<span className="font-serif text-xs text-foreground/40">
					start a new project
				</span>
			</button>
		</CampObject>
	);
}
