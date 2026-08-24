import {AdminShell, AdminTable, Tag} from "@/components/admin/shell";
import {HEAT_TIERS, relativeTime} from "@/lib/camp-layout";
import type {HeatTier} from "@/types/camp";

type AdminProject = {
    id: number;
	name: string;
	owner: string;
	hours: number;
    heat_tier: HeatTier;
	status: string;
	repo_url: string | null;
	demo_url: string | null;
	last_heartbeat_at: string | null;
};
export default function AdminProjects({
    tents,flash_notice,
}:{
    tents: AdminProject[];
	flash_notice: string | null;
}) {
    return (
        <AdminShell title="tents" subtitle="every project, most hours first" flashNotice={flash_notice}>
            <AdminTable
				headers={["project name", "owner", "hours", "tier", "status", "last heartbeat", "links"]}
			>
                {tents.length === 0 && (
                    <tr>
                        <td colSpan={7}>
                            no projects yet aw...
                        </td>
                    </tr>
                )}
                {tents.map((tent) => (
                    <tr key={tent.id}>
                        <td className="px-4 py-3 font-semibold">{tent.name}</td>
                        <td className="px-4 py-3 text-foreground/70">{tent.owner}</td>
						<td className="px-4 py-3 font-semibold text-primary">{tent.hours}h</td>

                        <td className="px-4 py-3">
                            <span className="text-sm font-semibold">
                                {HEAT_TIERS[tent.heat_tier].label}
                            </span>
                        </td>
                        <td className="px-4 py-3">
                            <Tag on={tent.status === "shipped" || tent.status === "approved"} onLabel={tent.status} offLabel={tent.status}/>
                        </td>
                        <td className="px-4 py-3 font-serif text-sm text-foreground/67">
                            {relativeTime(tent.last_heartbeat_at)}
                        </td>
                        <td className="px-4 py-3 flex gap-3 text-sm">
                            {tent.repo_url && (
								<a href={tent.repo_url} className="text-secondary hover:underline">
									repo
								</a>
							)}
                            {tent.demo_url && (
								<a href={tent.demo_url} className="text-secondary hover:underline">
									demo
								</a>
							)}
                            {!tent.repo_url && !tent.demo_url && (
								<span className="text-foreground/30">—</span>
							)}
                        </td>
                    </tr>
                ))}
            </AdminTable>
        </AdminShell>
    );
}