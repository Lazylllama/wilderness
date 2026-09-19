import {Link} from "@inertiajs/react";
import {LOG_SOURCE_LABELS, LogAmount, type LogEntry} from "@/components/admin/logs";
import {AdminShell, AdminTable, StatCard, Tag} from "@/components/admin/shell";
import {formatLogs, relativeTime} from "@/lib/camp-layout";

type AdminLogEntry = LogEntry & {user_id: number; user: string; email: string};

export default function AdminLogs({
    transactions, totals, source, sources, flash_notice,
}: {
    transactions: AdminLogEntry[];
    totals: {circulating: number; granted: number; spent: number};
    source: string;
	sources: string[];
	flash_notice: string | null;
}) {
    return (
        <AdminShell title="Logs" subtitle="The 100 most recent transactions" flashNotice={flash_notice}>
            <div className="flex flex-col gap-4">
				<div className="grid grid-cols-3 gap-4">
					<StatCard label="In circulation" value={`🪵 ${formatLogs(totals.circulating)}`} />
					<StatCard label="Granted by admins" value={`🪵 ${formatLogs(totals.granted)}`} />
					<StatCard label="Spent or removed" value={`🪵 ${formatLogs(totals.spent)}`} />
				</div>
                <div className="flex flex-row flex-wrap gap-2">
					{["", ...sources].map((option)=> {
						const label = option? LOG_SOURCE_LABELS[option]: "all";
						return (
							<Link key={option}href={option? `/admin/logs?source=${option}`: "/admin/logs"} preserveScroll>
							<Tag on={source === option} onLabel={label} offLabel={label}/>
							</Link>
						);
					})}

                    <AdminTable headers={["User", "Source", "Amount", "Note", "Date"]} empty="No transactions found">
                        {transactions.map((entry) => (
						<tr key={entry.id} className="border-t border-border align-top">
							<td className="px-4 py-3">
								<Link href={`/admin/users/${entry.user_id}`} className="flex flex-col hover:underline">
									<span className="font-semibold">{entry.user}</span>
									<span className="font-serif text-sm text-foreground/50">{entry.email}</span>
								</Link>
							</td>
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
				</div>
            </div>
        </AdminShell>
    );
}