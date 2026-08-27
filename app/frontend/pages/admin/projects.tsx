import {AdminShell, AdminTable, Tag} from "@/components/admin/shell";
import {Card, CardContent} from "@/components/wilderness/card";
import {HEAT_TIERS, relativeTime} from "@/lib/camp-layout";
import type {HeatTier} from "@/types/camp";
type HackatimeEntry = {name: string; hours: number | null};
type AdminProject = {
    id: number;
	name: string;
	owner: string;
    owner_email: string;
	hours: number;
    heat_tier: HeatTier;
	status: string;
	repo_url: string | null;
	demo_url: string | null;
    synced_at: string | null;
	hackatime: HackatimeEntry[];
};
export default function AdminProjects({
    projects, totals,flash_notice,
}:{
    projects: AdminProject[];
    totals: {projects: number; claimed: number; hours: number};
	flash_notice: string | null;
}) {
    return (
        <AdminShell title="Projects" subtitle="every project, most hours first" flashNotice={flash_notice}>
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-3 gap-4">
                    <Summary label="Total projects" value={totals.projects} />
					<Summary label="With hackatime linked" value={totals.claimed} />
					<Summary label="Total hours" value={totals.hours}/>
                </div>
            </div>
            <AdminTable
				headers={["project", "owner", "hackatime projects","hours", "tier", "status", "last heartbeat", "links"]}
			>
                {projects.length === 0 && (
                    <tr>
                        <td colSpan={7} className="px-4 py-8 text-center font-serif italic text-foreground/50">
                            no projects yet aw...
                        </td>
                    </tr>
                )}
                {projects.map((project) => (
                    <tr key={project.id} className="border-tborder-border hover:bg-background/40 transition-colors align-top">
                        <td className="px-4 py-3 font-semibold">{project.name}</td>
							<td className="px-4 py-3">
								<div className="flex flex-col">
									<span className="text-foreground/80">{project.owner}</span>
									<span className="font-serif text-sm text-foreground/40">
										{project.owner_email}
									</span>
								</div>
							</td>

                        <td className="px-4 py-3">
                            {project.hackatime.length === 0 ? (
								<span className="text-foreground/30">None linked</span>
							): (
                                <div className="flex flex-col gap-1">
                                    {project.hackatime.map((entry) => (
                                        <div key={entry.name} className="flex gap-2 text-sm">
                                            <span className="font-mono flex-row items-baseline text-forground/67">
                                            {entry.name}
                                            </span>

                                            {entry.hours === null? (
                                                <span className="text-destructive-foreground text-xs font-semibold">
                                                    no time
                                                </span>
                                            ):(
                                                <span className="text-primary font-semibold">
													{entry.hours}h
												</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </td>
                        <td className="px-4 py-3 font-semibold text-primary whitespace-nowrap">
                            {project.hours}h
                        </td>
                        <td className="px-4 py-3">
							<span className="text-sm font-semibold" style={{color:HEAT_TIERS[project.heat_tier].flag}}>
								{HEAT_TIERS[project.heat_tier].label}
							</span>
						</td>
                        <td className="px-4 py-3 font-serif text-sm text-foreground/60 whitespace-nowrap">
                            {relativeTime(project.synced_at)}
                        </td>
                        <td className="px-4 py-3">
                            <Tag on={project.status === "shipped" || project.status === "approved"} onLabel={project.status} offLabel={project.status}/>
                        </td>
                        <td className="px-4 py-3 flex gap-3 text-sm">
                            {project.repo_url && (
								<a href={project.repo_url} className="text-secondary hover:underline">
									repo
								</a>
							)}
                            {project.demo_url && (
								<a href={project.demo_url} className="text-secondary hover:underline">
									demo
								</a>
							)}
                            {!project.repo_url && !project.demo_url && (
								<span className="text-foreground/30">—</span>
							)}
                        </td>
                    </tr>
                ))}
            </AdminTable>
        </AdminShell>
    );
}

function Summary({label, value}: {label: string; value: number}) {
    return (
		<Card>
			<CardContent className="flex flex-col gap-1 p-5">
				<span className="font-serif text-sm text-foreground/50">{label}</span>
				<span className="text-3xl font-bold text-primary">{value}</span>
			</CardContent>
		</Card>
	);
}