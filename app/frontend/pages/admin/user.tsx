import {Link, router, useForm} from "@inertiajs/react";
import {ArrowLeft} from "lucide-react";
import {AdminShell, AdminTable, StatCard, Tag} from "@/components/admin/shell";
import {LOG_SOURCE_LABELS, LogAmount, type LogEntry} from "@/components/admin/logs";
import {ProjectLinks, ProjectStatus, ProjectTierLabel} from "@/components/admin/projects";
import {Button} from "@/components/wilderness/button";
import {Card, CardContent} from "@/components/wilderness/card";
import {Input} from "@/components/wilderness/input";
import {Label} from "@/components/wilderness/label";
import {formatLogs, relativeTime} from "@/lib/camp-layout";
import type {ProjectTier} from "@/types/camp";
type User = {
	id: number;
	name: string;
	email: string;
	slack_id: string | null;
	verification_status: string | null;
	admin: boolean;
	actor_enabled: boolean;
	rsvped_at: string | null;
	balance: number;
	region: string | null;
	hackatime_connected: boolean;
	hackatime_synced_at: string | null;
	streak: number;
	fire_state: string;
};
type UserProject = {
	id: number;
	name: string;
	status: string;
	hours: number;
	project_tier: ProjectTier;
	repo_url: string | null;
	demo_url: string | null;
};

const SOURCE_LABELS: Record<string, string> = {
	adjustment: "by hand",
	shop_purchase: "spent in the shop",
	ship_submission: "earned by shipping a project",
};
export default function AdminUser({
    camper,
	projects,
	transactions,
	flash_notice,
}:{
    camper: Camper;
	projects: CamperProject[];
	transactions: Entry[];
	flash_notice: string | null;
}) {
    const [amount, setAmount] = useState("");
	const [memo, setMemo] = useState("");

    function toggleField(field: "admin" | "camp_access") {
		router.patch(`/admin/users/${camper.id}`, {field}, {preserveScroll: true});
	}
	function adjustLogs(event: React.FormEvent) {
		event.preventDefault();
		form.post(`/admin/users/${camper.id}/logs`, {
			preserveScroll: true,
			onSuccess: () => form.reset(),
		});
	}

    function grant(event: React.FormEvent) {
        event.preventDefault();
		router.post(
            `/admin/users/${camper.id}/logs`,
            {amount, memo},
			{
				preserveScroll: true,
				onSuccess: () => {
					setAmount("");
					setMemo("");
				},
			},
        );
    }

    return (
        <AdminShell title={camper.name} subtitle={camper.email} flashNotice={flash_notice}>
            	<div className="flex flex-col gap-4">
                    <button type="button" onClick={() => router.visit("/admin/users")} className="flex w-fit cursor-pointer items-center gap-2 font-serif text-lg italic text-foreground/60 transition-colors hover:text-foreground">
                        <ArrowLeft size={20} strokeWidth={3}/>all users
                    </button>

                    <div className="grid grid-cols-4 gap-4">
					<Stat label="Logs" value={`🪵 ${formatLogs(camper.balance)}`}/>
					<Stat label="Projects" value={String(camper.projects_count)}/>
					<Stat label="Streak" value={`${camper.streak}d`}/>
					<Stat label="Fire" value={camper.fire_state}/>
				</div>

                <div className="grid grid-cols-2 gap-4">
                    <Card>
                        <CardContent className="flex flex-col gap-3 p-5">
                            <span className="text-lg font-bold">Account details</span>
							<Detail label="slack" value={camper.slack_id?? "—"} mono/>
							<Detail label="verified" value={camper.verification_status || "—"}/>
							<Detail label="region" value={camper.region?? "not set"}/>
							<Detail label="rsvped" value={relativeTime(camper.rsvped_at)}/>
                            <Detail label="hackatime" value={
								camper.hackatime_connected? `synced ${relativeTime(camper.hackatime_synced_at)}`:"not connected"
							}/>

                            <div className="flex flex-row gap-3 pt-2">
                                <button type="button" onClick={() => toggleField("admin")}>
									<Tag on={camper.admin} onLabel="admin" offLabel="not a admin" />
								</button>
                            </div>

                        </CardContent>
                    </Card>
                </div>
				<Card>
					<CardContent className="p-5">
						<form onSubmit={adjustLogs} className="flex flex-col gap-4">
							<h3 className="text-lg font-bold">Adjust logs</h3>
							<div className="grid grid-cols-[12rem_1fr_auto] items-end gap-4">
								<Label>Amount
									<Input className="w-full" type="number" step={1} required value={form.data.amount} onChange={(event) => form.setData("amount", event.target.value)} placeholder="50 or -50"/>
								</Label>
								<Label>
									Note
									<Input className="w-full" required value={form.data.memo} onChange={(event) => form.setData("memo", event.target.value)} placeholder="Reason for this change"/>
								</Label>
								<Button type="submit" className="h-12" disabled={form.processing}>
									Apply
								</Button>
							</div>
							{formError && (
								<p className="text-sm font-semibold text-destructive-foreground">{formError}</p>
							)}
							<p className="font-serif text-sm text-foreground/50">
								Use a negative amount to remove logs, and a note is required for all changes to log balance
							</p>
						</form>
					</CardContent>
				</Card>

				<section className="flex flex-col gap-2">
					<h3 className="text-lg font-bold">Projects</h3>
					<AdminTable headers={["Project", "Status", "Hours", "Tier", "Links"]} empty="This user has no projects.">
						{projects.map((project) => (
							<tr key={project.id} className="border-t border-border align-top">
								<td className="px-4 py-3 font-semibold">{project.name}</td>
								<td className="px-4 py-3">
									<ProjectStatus status={project.status}/>
								</td>
								<td className="whitespace-nowrap px-4 py-3 font-semibold text-primary">{project.hours}h</td>
								<td className="px-4 py-3">
									<ProjectTierLabel tier={project.project_tier}/>
								</td>
								<td className="px-4 py-3">
									<ProjectLinks repoUrl={project.repo_url} demoUrl={project.demo_url}/>
								</td>
							</tr>
						))}
					</AdminTable>
				</section>

				<section className="flex flex-col gap-2">
					<h3 className="text-lg font-bold">Log history</h3>
					<AdminTable headers={["Source", "Amount", "Note", "Date"]} empty="No activity yet.">
						{transactions.map((entry) => (
							<tr key={entry.id} className="border-t border-border align-top">
								<td className="px-4 py-3 text-sm">{LOG_SOURCE_LABELS[entry.source]}</td>
								<td className="px-4 py-3">
									<LogAmount amount={entry.amount} />
								</td>
								<td className="px-4 py-3 text-sm text-foreground/67">{entry.memo}</td>
								<td className="whitespace-nowrap px-4 py-3 font-serif text-sm text-foreground/60">
									{relativeTime(entry.created_at)}
								</td>
							</tr>
						))}
					</AdminTable>
				</section>
                </div>
        </AdminShell>
    );
}

function Detail({label, children}: {label: string; children: React.ReactNode}) {
	return (
		<div className="flex flex-row justify-between gap-4 text-sm">
			<span className="text-foreground/50">{label}</span>
			<span className="text-right font-semibold">{children}</span>
		</div>
	);
}

function AccessToggle({
	label,description,on,onToggle,
}: {
	label: string;
	description: string;
	on: boolean;
	onToggle: () => void;
}) {
	return (
		<div className="flex flex-row items-center justify-between gap-4">
			<div className="flex flex-col">
				<span className="font-semibold">{label}</span>
				<span className="font-serif text-sm text-foreground/50">{description}</span>
			</div>

			<div className="flex flex-row items-center gap-3">
				<Tag on={on} onLabel="Enabled" offLabel="Disabled"/>
				<Button variant="outline" className="px-3 py-1.5 text-sm" onClick={onToggle}>
					{on? "Revoke": "Grant"}
				</Button>
			</div>
		</div>
	);
}