import { MoveUpRight } from "lucide-react";
import { Button } from "@/components/wilderness/button";

export function Navbar() {
	return (
		<div className="bg-background flex flex-row justify-between py-5 items-center">
			<div className="flex flex-row items-center gap-10">
				<div className="flex flex-row gap-1">
					<h1 className="text-2xl">🌲</h1>
					<h1 className="text-2xl text-white font-semibold">wilderness</h1>
				</div>
				<div className="flex flex-row items-center gap-8">
					<NavbarLink name="how it works" href="#" />
					<NavbarLink name="the tiers" href="#" />
					<NavbarLink name="shop" href="" />
					<NavbarLink name="faq" href="" />
				</div>
			</div>
			<div className="flex flex-row gap-2 items-center">
				<Button variant="link" className="text-lg">
					sign in
				</Button>
				<Button className="flex items-center flex-row gap-1">
					setup your tent
					<MoveUpRight size={20} strokeWidth={3} />
				</Button>
			</div>
		</div>
	);
}

function NavbarLink({ name, href }: { name: string; href: string }) {
	return (
		<a
			href={href}
			className="text-foreground/70 hover:text-foreground/50 font-serif italic text-xl transition-all"
		>
			{name}
		</a>
	);
}
