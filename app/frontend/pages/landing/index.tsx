import { FlameKindling, MoveUpRight } from "lucide-react";
import {
	HeatTierCards,
	ShopPreview,
	StepCards,
} from "@/components/landing/cards";
import { EmojiSnow } from "@/components/landing/emoji-snow";
import {
	SectionContent,
	SectionHeading,
	SectionWrapper,
} from "@/components/landing/sections";
import { Navbar } from "@/components/navbar";
import { Trees } from "@/components/trees";
import { Button } from "@/components/wilderness/button";
import { Card, CardContent } from "@/components/wilderness/card";
import { Input } from "@/components/wilderness/input";
import { Label } from "@/components/wilderness/label";

export default function LandingPage({
	release_flipper = false,
	hour_multipliers,
	base_hour_rate,
	items,
}: {
	release_flipper: boolean;
	hour_multipliers: Record<string, number>;
	base_hour_rate: number;
	items: Array<{
		id: number;
		title: string;
		price: number;
		image_url: string;
	}>;
}) {
	return (
		<>
			{release_flipper && (
				<div className="w-screen flex flex-row items-center justify-center text-center p-2 bg-destructive-background text-destructive-foreground">
					THIS IS THE RELEASE VERSION.
				</div>
			)}
			<Navbar />
			<div className="relative isolate w-full h-[750px] bg-linear-to-b from-night-blue to-card">
				<EmojiSnow />
				<div className="grid grid-cols-2 max-w-7xl h-full mx-auto">
					<div className="col-span-1 flex flex-col px-10.5 gap-4 my-auto">
						<span className="font-semibold text-[64px]/19 flex flex-col relative">
							spend this winter building games
							<br /> in the woods.
							<span className="text-sm text-foreground/40 absolute -bottom-2 right-[225px]">
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
									{release_flipper ? "lets go" : "RSVP"}{" "}
									<FlameKindling size={20} strokeWidth={3} />
								</Button>
							</div>
						</Label>
					</div>
					<div className="col-span-1">{/* image go here */}</div>
				</div>
				<Trees />
			</div>
			<SectionWrapper>
				<Card>
					<CardContent className="flex flex-row gap-4 items-center justify-between">
						<div className="flex items-center justify-center h-18 aspect-square border rounded-xl">
							🤓☝️
						</div>
						<div>
							<h1 className="font-semibold text-xl">
								“b-b-but I’m not a game dev”
							</h1>
							<p className="text-foreground/70 font-serif">
								even though the wilderness just so happens to{" "}
								<span className="font-bold">LOVE</span> games, that doesn’t mean
								we accept anything else, we welcome any and all software
								projects and nothing gets different, the same shop, same
								experience and the same fires.
							</p>
						</div>
						<Button variant="secondary">
							guides <MoveUpRight size={20} strokeWidth={3} />
						</Button>
					</CardContent>
				</Card>
			</SectionWrapper>
			<SectionWrapper>
				<SectionHeading
					id="step-by-step"
					title="step by step"
					subtitle="so lets go through how this works in 4 simple steps"
				/>
				<SectionContent className="grid grid-cols-4 gap-4">
					<StepCards />
				</SectionContent>
			</SectionWrapper>
			<SectionWrapper>
				<SectionHeading
					id="project-heat-tiers"
					title="project heat tiers"
					subtitle="the cooler the project, the better the payout"
				/>
				<SectionContent className="grid grid-cols-4 gap-4">
					<HeatTierCards
						baseHourRate={base_hour_rate}
						hourMultipliers={hour_multipliers}
					/>
				</SectionContent>
			</SectionWrapper>
			<SectionWrapper>
				<SectionHeading
					id="shop-preview"
					title="take a peek at whats ahead"
					subtitle="crazy that you can just code and get stuff, amaze amaze"
				/>
				<SectionContent>
					<ShopPreview items={items} averageHourRate={67} />
				</SectionContent>
			</SectionWrapper>
		</>
	);
}
