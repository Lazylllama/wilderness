import { Link } from "@inertiajs/react";
import { Flame, Moon, Sun, TreePine } from "lucide-react";
import { formatLogs } from "@/lib/camp-layout";
import { cn } from "@/lib/utils";
import type { Camp } from "@/types/camp";

function Pill({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"flex items-center gap-1.5 whitespace-nowrap rounded-full border border-pill-border bg-pill-background px-3 py-1.5 text-sm font-semibold text-pill-foreground backdrop-blur-sm",
				className,
			)}
		>
			{children}
		</div>
	);
}

export function CampHud({
	camp,
	night,
	onToggleNight,
	userName,
}: {
	camp: Camp;
	night: boolean;
	onToggleNight: () => void;
	userName: string;
}) {
	return (
		<div className="pointer-events-none absolute inset-x-0 top-0 z-50 flex flex-wrap items-start justify-between gap-2 p-4">
			<div className="pointer-events-auto flex items-center gap-2 font-semibold drop-shadow-[0_2px_3px_rgba(0,0,0,0.867)]">
				<TreePine className="text-secondary" />
				<span>{userName}&rsquo;s camp</span>
			</div>

			<div className="flex flex-wrap items-center gap-2">
				<button
					type="button"
					onClick={onToggleNight}
					className="pointer-events-auto cursor-pointer outline-none"
				>
					<Pill className="transition-colors hover:border-primary/67">
						{night ? <Moon size={16} /> : <Sun size={16} />}
						{night ? "night" : "day"}
					</Pill>
				</button>
				<Pill>
					<Flame size={16} className="text-primary" />
					{camp.streak} day streak
				</Pill>
				<Pill>🪵 {formatLogs(camp.logs_balance)}</Pill>
				<Link href="/shop" className="pointer-events-auto">
					<Pill className="transition-colors hover:border-primary/67">
						shop
					</Pill>
				</Link>
			</div>
		</div>
	);
}