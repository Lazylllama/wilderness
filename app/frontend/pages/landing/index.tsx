import { FlameKindling } from "lucide-react";
import { EmojiSnow } from "@/components/emoji-snow";
import { Navbar } from "@/components/navbar";
import { PageWrapper } from "@/components/page-wrapper";
import { Trees } from "@/components/trees";
import { Button } from "@/components/wilderness/button";
import { Input } from "@/components/wilderness/input";
import { Label } from "@/components/wilderness/label";

export default function LandingPage() {
	return (
		<>
			<PageWrapper>
				<Navbar />
			</PageWrapper>
			<div className="relative isolate w-full h-[750px] bg-linear-to-b from-night-blue to-background">
				<EmojiSnow />
				<div className="grid grid-cols-2 max-w-7xl h-full mx-auto">
					<div className="col-span-1 flex flex-col px-10.5 gap-4 my-auto">
						<span className="font-semibold text-[64px]/19 flex flex-col relative">
							spend this winter building games
							<br /> in the woods.
							<span className="text-sm text-foreground/40 absolute -bottom-1 right-[225px]">
								(not literally duh)
							</span>
						</span>
						<p className="text-foreground/70 font-serif font-bold">
							setup your tent, make a game and log your hours{" "}
							<span className="italic">(pun intended)</span> around the
							campfire. every hours spent earns you{" "}
							<span className="text-primary/70">logs</span>, spend them on
							straight peak in the shop.
						</p>
						<Label htmlFor="email" className="">
							your email
							<div className="flex flex-row gap-2 h-fit">
								<Input id="email" placeholder={"mrrp@lazyllama.xyz"} />

								<Button variant={"secondary"} className="h-fit">
									RSVP <FlameKindling size={20} strokeWidth={3} />
								</Button>
							</div>
						</Label>
					</div>
					<div className="col-span-1"></div>
				</div>
				<Trees />
			</div>
		</>
	);
}
