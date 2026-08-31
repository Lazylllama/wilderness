import { Link } from "@inertiajs/react";
import { CART, RANGER } from "@/lib/camp-layout";
import { CartArt, RangerPostArt } from "./art";
import { CampObject } from "./stage";

const LANDMARK =
	"group flex w-[clamp(4.5rem,8vw,7rem)] flex-col items-center outline-none transition-transform duration-200 hover:-translate-y-1 focus-visible:-translate-y-1";

function SignPost({ label }: { label: string }) {
	return (
		<span className="mt-1 whitespace-nowrap rounded-full border border-pill-border bg-pill-background px-2.5 py-0.5 text-xs font-semibold text-pill-foreground backdrop-blur-sm">
			{label}
		</span>
	);
}

export function ShopCart() {
	return (
		<CampObject x={CART.x} y={CART.y}>
			<Link href="/shop" className={LANDMARK}>
				<CartArt className="w-full drop-shadow-[0_6px_10px_rgba(0,0,0,0.45)]" />
				<SignPost label="shop" />
			</Link>
		</CampObject>
	);
}

export function RangerPost() {
	return (
		<CampObject x={RANGER.x} y={RANGER.y}>
			<Link href="/ranger" className={LANDMARK}>
				<RangerPostArt className="w-3/4 drop-shadow-[0_6px_10px_rgba(0,0,0,0.45)]" />
				<SignPost label="ranger post" />
			</Link>
		</CampObject>
	);
}
