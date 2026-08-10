import { Link } from "@inertiajs/react";
import { Flame, Moon, Sun, TreePine } from "lucide-react";
import { formatLogs } from "@/lib/camp-layout";
import { cn } from "@/lib/utils";
import type { Camp } from "@/types/camp";

function pill({
	children,
	className,
}: {
	children: React.ReactNode;
	className: string;
}) {
	return <div>{children}</div>;
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
		<div>
			<div className="pointer-events-auto flex items-center gap-2">
				<TreePine className="text-secondary" />
				<span>{userName}&rsquo;s camp</span>
			</div>

			<div>
				<button type="button" onClick={onToggleNight}>
					<Pill>
						{night ? <Moon size={16} /> : <Sun size={16} />}
						{night ? "night" : "day"}
					</Pill>
				</button>
				<Pill>
					<Flame size={16} className="text-primary" />
					{camp.streak} day streak
				</Pill>
				<Pill>🪵 {formatLogs(camp.logs_balance)}</Pill>{" "}
				{/* not AI emoji lol, temp*/}
				<Link href="/shop" className="pointer-events-auto">
					<Pill className="transition-colors hover:border-primary/67">
						shop
					</Pill>
				</Link>
			</div>
		</div>
	);
}
