import { Link, router } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/wilderness/button";
import { relativeTime } from "@/lib/camp-layout";

export default function RangerIndex({
	connected,
	synced_at,
	project_count,
}: {
	connected: boolean;
	synced_at: string | null;
	project_count: number;
}) {
	return (
		<div className="min-h-dvh bg-linear-to-b from-night-blue to-background">
			<div className="mx-auto flex max-w-2xl flex-col gap-7 px-6 py-10">
				<div className="flex flex-wrap items-end justify-between gap-4">
					<div className="flex flex-col gap-1">
						<h1 className="text-4xl font-bold">ranger post</h1>
						<p className="font-serif italic text-foreground/60">
							where the hours get counted.
						</p>
					</div>
					<Link
						href="/camp"
						className="flex items-center gap-2 font-serif text-lg italic text-foreground/60 transition-colors hover:text-foreground"
					>
						<ArrowLeft size={20} strokeWidth={3} /> back to camp
					</Link>
				</div>

				<div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6">
					<div className="flex flex-col gap-1">
						<span className="text-lg font-semibold">hackatime</span>
						<span className="font-serif text-sm text-foreground/60">
							{connected
								? `${project_count} project${project_count === 1 ? "" : "s"} visible · last synced ${relativeTime(synced_at)}`
								: "link hackatime so your tents can claim the hours you code."}
						</span>
					</div>

					{connected ? (
						<div className="flex flex-wrap gap-3">
							<Button
								type="button"
								onClick={() => router.post("/tents/sync")}
							>
								resync now
							</Button>
							<Button
								type="button"
								variant="outline"
								onClick={() => router.delete("/hackatime/disconnect")}
							>
								disconnect
							</Button>
						</div>
					) : (
						// full page load on purpose — this route redirects off-site to hackatime
						<a href="/hackatime/connect" className="w-fit">
							<Button type="button">connect hackatime</Button>
						</a>
					)}
				</div>
			</div>
		</div>
	);
}
