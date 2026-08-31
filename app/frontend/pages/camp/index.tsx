import { usePage } from "@inertiajs/react";
import { useMemo, useState } from "react";
import { CampHud } from "@/components/camp/camp-hud";
import { Campfire } from "@/components/camp/campfire";
import { EmptyPlot } from "@/components/camp/empty-plot";
import { RangerPost, ShopCart } from "@/components/camp/landmarks";
import { CampStage } from "@/components/camp/stage";
import { CampTent } from "@/components/camp/tent";
import { TentPanel } from "@/components/camp/tent-panel";
import { FIRE_STATES, PLOT_COUNT } from "@/lib/camp-layout";
import type { CampPageProps, Tent } from "@/types/camp";

type Panel = { tent: Tent | null; plotIndex: number | null };

export default function CampIndex({
	camp,
	tents,
	hackatime_projects,
}: CampPageProps) {
	const { user } = usePage<{ user: { name: string } }>().props;
	const [night, setNight] = useState(true);
	const [panel, setPanel] = useState<Panel | null>(null);

	// only the first free plot gets a dashed triangle, so the clearing stays calm
	const nextPlot = useMemo(() => {
		const taken = new Set(tents.map((tent) => tent.plot_index));
		const limit = Math.min(camp.plot_count, PLOT_COUNT);
		for (let index = 0; index < limit; index++) {
			if (!taken.has(index)) return index;
		}
		return null;
	}, [tents, camp.plot_count]);

	return (
		<main className="p-3 sm:p-5">
			<CampStage night={night} glow={FIRE_STATES[camp.fire_state].glow}>
				<CampHud
					camp={camp}
					night={night}
					onToggleNight={() => setNight((value) => !value)}
					userName={user.name}
				/>

				{tents.map((tent) => (
					<CampTent
						key={tent.id}
						tent={tent}
						onOpen={(opened) => setPanel({ tent: opened, plotIndex: null })}
					/>
				))}

				{nextPlot !== null && (
					<EmptyPlot
						plotIndex={nextPlot}
						onPitch={(plotIndex) => setPanel({ tent: null, plotIndex })}
					/>
				)}

				<Campfire camp={camp} onOpen={() => {}} />
				<ShopCart />
				<RangerPost />
			</CampStage>

			<TentPanel
				tent={panel?.tent ?? null}
				plotIndex={panel?.plotIndex ?? null}
				projects={hackatime_projects}
				open={panel !== null}
				onOpenChange={(open) => {
					if (!open) setPanel(null);
				}}
			/>
		</main>
	);
}
