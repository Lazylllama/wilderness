import { Button } from "@base-ui/react";

export function Navbar() {
	return (
		<div className="bg-background flex flex-row justify-between">
			<div className="flex flex-row items-center">
				<h1 className="text-3xl font-bold text-foreground p-4">
					🌲 wilderness
				</h1>
				<NavbarLink name="link 1" href="/link1" />
				<NavbarLink name="link 2" href="/link2" />
			</div>
			<Button>yeehaaw</Button>
		</div>
	);
}

function NavbarLink({ name, href }: { name: string; href: string }) {
	return (
		<a
			href={href}
			className="text-foreground p-4 hover:text-primary font-serif italic text-xl"
		>
			{name}
		</a>
	);
}
