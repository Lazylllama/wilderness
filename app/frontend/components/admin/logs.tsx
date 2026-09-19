import {formatLogs} from "@/lib/camp-layout";
import {cn} from "@/lib/utils";

export type LogEntry = {
	id: number;
	amount: number;
	source: string;
	memo: string;
	created_at: string;
};
export const LOG_SOURCE_LABELS: Record<string, string> = {
    adjustment: "Admin adjustment",
	ship_submission: "Project shipped",
	shop_purchase: "Shop purchase",
};
export function LogAmount({ amount }: { amount: number }) {
	return (
		<span className={cn(
				"whitespace-nowrap font-semibold",
				amount< 0? "text-destructive-foreground": "text-secondary",)}>
			{amount > 0 && "+"}
			{formatLogs(amount)}
		</span>
	);
}