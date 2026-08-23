import {Flame, type LucideIcon, Shield, Tent, Users} from "lucide-react";
import {AdminShell} from "@/components/admin/shell";
import {Card, CardContent} from "@/components/wilderness/card";
import {relativeTime} from "@/lib/camp-layout";

export default function AdminOverview({
    stats, camp_open, recent, flash_notice,
}: {
    stats: {
        rsvps: number;
        with_access: number;
        admins: number;
        tents: number;
		shipped: number;
		hours: number;
    };
    camp_open: boolean;
    recent: {id: number; name: string; email: string; rsvped_at: string | null}[];
    flash_notice: string | null;
}) {
    return (
        <AdminShell title="how camp is doing" subtitle="who's on the list" flashNotice={flash_notice}>
            <div className="flex flex-col gap-6">
                <div className={
                    camp_open? "rounded-lg border border-pill-border bg-pill-background px-4 py-3 text-pill-foreground font-semibold"
							:"rounded-lg border border-border bg-background/40 px-4 py-3 text-foreground/60 font-semibold"
                }>
                    {camp_open? "camp is open to everyone.": "camp is closed — only invited can get in."}
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <Stat icon={Users} label="rsvps" value={stats.rsvps}/>
                    <Stat icon={Flame} label="users with access" value={stats.with_access}/>
					<Stat icon={Shield} label="users" value={stats.admins}/>
					<Stat icon={Tent} label="projects" value={stats.tents}/>
                    <Stat icon={Flame} label="hours burned" value={stats.hours}/>
                </div>

                <Card>
                    <CardContent className="flex flex-col gap-3">
                        <h3 className="text-lg font-semibold">
                            <h3 className="text-lg font-semibold">latest rsvps</h3>
                            {recent.length === 0 && (
							<p className="font-serif italic text-foreground/50">
								nobody&rsquo;s rsvped yet.
							</p>
						    )}

                            {recent.map((person) => (
							<div
								key={person.id} className="flex flex-row items-center justify-between border-b border-border last:border-0 pb-2 last:pb-0">
								<div className="flex flex-col">
									<span className="font-semibold">{person.name}</span>
									<span className="font-serif text-sm text-foreground/50">
										{person.email}
									</span>
								</div>
								<span className="font-serif text-sm text-foreground/50">
									{relativeTime(person.rsvped_at)}
								</span>
							</div>
						    ))}
                        </h3>
                    </CardContent>
                </Card>
            </div>
        </AdminShell>
    );
}

function Stat({
    icon: Icon,label,value,
}: {
    icon: LucideIcon;
	label: string;
	value: number;
}) {
    return (
        <Card>
            <CardContent className="flex flex-col gap-1 p-5">
                <div className="flex items-center gap-2 text-foreground/50">
                    <Icon size={16} strokeWidth={3}/>
                    <span>{label}</span>
                </div>
                <span className="text-4xl font-bold text-primary">{value}</span>
            </CardContent>
        </Card>
    );
}