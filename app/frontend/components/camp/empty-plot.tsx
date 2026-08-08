import {plotFor } from "@/lib/camp-layout";

export function EmptyPlot({
    plotIndex,onPitch,
}: {
    plotIndex: number;
	onPitch: (plotIndex:number)=>void;
}) {
    const plot = plotFor(plotIndex);
    return(
        <CampObject x={plot.x} y={plot.y}>
            <button type="button"onClick={() => onPitch(plotIndex)}>
                <PlotArt/>
                    <span>
					pitch a tent
				    </span>
                    <span className="font-serif text-xs text-foreground/40">
					start a new project
				</span>
            </button>
        </CampObject>
    );
}