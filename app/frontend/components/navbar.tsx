import { MoveUpRight } from "lucide-react";
import { Button } from "@/components/wilderness/button";
import { LoginButton } from "./auth-buttons";
import { WildernessLogo } from "./logo";

export function Navbar({
	release_flipper = false,
}: {
	release_flipper: boolean;
}) {
	function ScrollToSection(id: string) {
		const section = document.getElementById(id);
		if (section) {
			section.scrollIntoView({ behavior: "smooth" });
		}
	}

	return (
		<div className="max-w-7xl px-8 mx-auto 	bg-background flex flex-row justify-between py-5 items-center">
			<div className="flex flex-row items-center gap-10">
				<WildernessLogo />
				<div className="flex flex-row items-center gap-8">
					<NavbarButton
						name="how it works"
						onClick={() => ScrollToSection("step-by-step")}
					/>
					<NavbarButton
						name="the tiers"
						onClick={() => ScrollToSection("project-heat-tiers")}
					/>
					<NavbarButton
						name="shop"
						onClick={() => ScrollToSection("shop-preview")}
					/>
					<NavbarLink name="faq" href="/faq" />
				</div>
			</div>
			<div className="flex flex-row gap-2 items-center">
				<LoginButton
					disabled={!release_flipper}
					variant="link"
					className="text-lg"
				>
					sign in
				</LoginButton>
				<Button
					disabled={!release_flipper}
					className="flex items-center flex-row gap-1"
				>
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

function NavbarButton({
	name,
	onClick,
}: {
	name: string;
	onClick: () => void;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="text-foreground/70 hover:text-foreground/50 font-serif italic text-xl transition-all cursor-pointer"
		>
			{name}
		</button>
	);
}
