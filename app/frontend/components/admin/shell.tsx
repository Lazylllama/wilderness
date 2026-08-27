import { Link, router, usePage } from "@inertiajs/react";
import {
	ArrowLeft,
	Flame,
	LayoutDashboard,
	type LucideIcon,
	Shield,
	Tent,
	Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const TABS: { href: string; label: string; icon: LucideIcon }[] = [
	{ href: "/admin", label: "overview", icon: LayoutDashboard },
	{ href: "/admin/users", label: "campers", icon: Users },
	{ href: "/admin/projects", label: "projects", icon: Tent },
	{ href: "/admin/flags", label: "flipper", icon: Flame },
];

export function AdminShell({
	title,
	subtitle,
	flashNotice,
	children,
}: {
	title: string;
	subtitle: string;
	flashNotice?: string | null;
	children: React.ReactNode;
}) {
	const { url } = usePage();
	const path = url.split("?")[0];

	return (
		<div className="min-h-dvh bg-linear-to-b from-night-blue to-background">
			<div className="max-w-7xl mx-auto px-8 py-10 flex flex-col gap-7">
				<div className="flex flex-row items-end justify-between gap-4">
					<div className="flex flex-col gap-1">
						<h1 className="text-4xl font-bold flex items-center gap-3">
							<Shield className="text-primary" size={32} strokeWidth={2.67} />
							dashboard
						</h1>
						<p className="text-foreground/60 font-serif italic">{subtitle}</p>
					</div>
					<button
						type="button"
						onClick={() => router.visit("/")}
						className="flex items-center gap-2 text-foreground/60 hover:text-foreground font-serif italic text-lg transition-colors cursor-pointer"
					>
						<ArrowLeft size={20} strokeWidth={3} /> back to the trailhead
					</button>
				</div>

				<div className="flex flex-row gap-1 border-b border-border">
					{TABS.map((tab) => {
						const active =
							tab.href === "/admin"
								? path === "/admin"
								: path.startsWith(tab.href);
						return (
							<Link
								key={tab.href}
								href={tab.href}
								className={cn(
									"flex items-center gap-2 px-4 py-2.5 -mb-px border-b-2 font-semibold transition-colors",
									active
										? "border-primary text-primary"
										: "border-transparent text-foreground/50 hover:text-foreground",
								)}
							>
								<tab.icon size={18} strokeWidth={2.5} />
								{tab.label}
							</Link>
						);
					})}
				</div>

				{flashNotice && (
					<div className="rounded-lg border border-secondary/40 bg-secondary/10 px-4 py-3 text-secondary font-semibold">
						{flashNotice}
					</div>
				)}

				<div className="flex flex-col gap-2">
					<h2 className="text-2xl font-bold">{title}</h2>
					{children}
				</div>
			</div>
		</div>
	);
}

export function Tag({
	on,
	onLabel,
	offLabel,
}: {
	on: boolean;
	onLabel: string;
	offLabel: string;
}) {
	return (
		<span
			className={cn(
				"inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-wide transition-colors",
				on
					? "border-pill-border bg-pill-background text-pill-foreground"
					: "border-border bg-background/60 text-foreground/40",
			)}
		>
			{on ? onLabel : offLabel}
		</span>
	);
}

export function AdminTable({
	headers,
	children,
}: {
	headers: string[];
	children: React.ReactNode;
}) {
	return (
		<div className="overflow-x-auto rounded-lg border border-border">
			<table className="w-full text-left border-collapse">
				<thead>
					<tr className="bg-background/60 text-foreground/60">
						{headers.map((header) => (
							<th
								key={header}
								className="px-4 py-3 font-semibold uppercase tracking-wide text-xs"
							>
								{header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>{children}</tbody>
			</table>
		</div>
	);
}
