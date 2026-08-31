import { Link } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import { formatLogs } from "@/lib/camp-layout";

type ShopItem = {
	id: number;
	title: string | null;
	price: number | null;
	image_url: string | null;
};

export default function ShopIndex({
	items,
	logs_balance,
}: {
	items: ShopItem[];
	logs_balance: number;
}) {
	return (
		<div className="min-h-dvh bg-linear-to-b from-night-blue to-background">
			<div className="mx-auto flex max-w-5xl flex-col gap-7 px-6 py-10">
				<div className="flex flex-wrap items-end justify-between gap-4">
					<div className="flex flex-col gap-1">
						<h1 className="text-4xl font-bold">the shop</h1>
						<p className="font-serif italic text-foreground/60">
							spend the logs you burned for.
						</p>
					</div>
					<div className="flex items-center gap-4">
						<span className="whitespace-nowrap rounded-full border border-pill-border bg-pill-background px-3 py-1.5 text-sm font-semibold text-pill-foreground">
							🪵 {formatLogs(logs_balance)}
						</span>
						<Link
							href="/camp"
							className="flex items-center gap-2 font-serif text-lg italic text-foreground/60 transition-colors hover:text-foreground"
						>
							<ArrowLeft size={20} strokeWidth={3} /> back to camp
						</Link>
					</div>
				</div>

				{items.length === 0 ? (
					<p className="rounded-lg border border-dashed border-border p-8 text-center font-serif text-foreground/50">
						the cart is empty. the quartermaster hasn&rsquo;t stocked it yet.
					</p>
				) : (
					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{items.map((item) => {
							const affordable = (item.price ?? 0) <= logs_balance;
							return (
								<div
									key={item.id}
									className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4"
								>
									{item.image_url && (
										<img
											src={item.image_url}
											alt=""
											className="aspect-4/3 w-full rounded-lg object-cover"
										/>
									)}
									<span className="font-semibold">{item.title}</span>
									<span
										className={
											affordable
												? "text-sm font-semibold text-primary"
												: "text-sm font-semibold text-foreground/40"
										}
									>
										🪵 {formatLogs(item.price ?? 0)}
										{!affordable && " · not enough logs"}
									</span>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}
