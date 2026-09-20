import {Tag} from "@/components/admin/shell";
import {PROJECT_TIERS} from "@/lib/camp-layout";
import type {ProjectTier} from "@/types/camp";

export function HeatTierLabel({tier}: {tier: HeatTier}) {
    return (
        <span className="text-sm font-semibold capitalize" style={{color: PROJECT_TIERS[tier].flag}}>
            {PROJECT_TIERS[tier].label}
        </span>
    );
}

export function ProjectStatus({status}: {status: string}) {
	const label = status.replace("_", " ");
	return (
		<Tag
			on={status === "shipped" || status === "approved"}
			onLabel={label}
			offLabel={label}
		/>
	);
}

export function ProjectLinks({
	repoUrl,
	demoUrl,
}: {
	repoUrl: string | null;
	demoUrl: string | null;
}) {
	if (!repoUrl && !demoUrl) {
		return <span className="text-foreground/30">—</span>;
	}
	return (
		<div className="flex gap-3 text-sm">
			{repoUrl && (
				<a href={repoUrl} target="_blank" rel="noreferrer" className="text-secondary hover:underline">
					Repository
				</a>
			)}
			{demoUrl && (
				<a href={demoUrl} target="_blank" rel="noreferrer" className="text-secondary hover:underline">
					Demo
				</a>
			)}
		</div>
	);
}