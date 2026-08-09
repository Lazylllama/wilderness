import { WildernessLogo } from "../logo";

export function Footer() {
	const links = [
		{
			name: "slack channel",
			href: "https://hackclub.enterprise.slack.com/archives/C0BLD6X2ZJQ",
		},
		{
			name: "github",
			href: "https://github.com/lazylllama/wilderness",
		},
		{
			name: "faq",
			href: "/faq",
		},
		{
			name: "privacy",
			href: "https://hackclub.com/privacy-and-terms",
		},
	];

	// TODO: make it look like the footer is on fire and somehow with like sparks going up
	return (
		<footer className="flex flex-row items-center justify-between px-8 py-5 max-w-7xl mx-auto">
			<div className="flex flex-row gap-10 items-center">
				<WildernessLogo />
				<div className="flex flex-row gap-2 items-center italic">
					<p>made with {"<3"} by teens 4 teens @</p>
					<a
						href="https://hackclub.com"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img
							width={80}
							src="https://assets.hackclub.com/flag-standalone.svg"
							alt="Hack Club Flag"
						/>
					</a>
				</div>
			</div>
			<div className="flex flex-row gap-4 items-center">
				{links.map((link, index) => (
					<a
						key={index}
						href={link.href}
						target="_blank"
						rel="noopener noreferrer"
						className="text-foreground/70 hover:text-foreground/50 text-[16px] transition-all"
					>
						{link.name}
					</a>
				))}
			</div>
		</footer>
	);
}
