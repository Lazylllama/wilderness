
import { router, usePage } from "@inertiajs/react";
import type { VariantProps } from "class-variance-authority";
import { FlameKindling, MoveUpRight } from "lucide-react";
import type { SharedProps } from "@/types";
import {
	HeatTierCards,
	ShopPreview,
	StepCards,
} from "@/components/landing/cards";
import { EmojiSnow } from "@/components/landing/emoji-snow";
import { Footer } from "@/components/landing/footer";
import {
	SectionContent,
	SectionHeading,
	SectionWrapper,
} from "@/components/landing/sections";
import { Navbar } from "@/components/navbar";
import { Trees } from "@/components/trees";
import { Alert, type alertVariants } from "@/components/wilderness/alert";
import { Button } from "@/components/wilderness/button";
import { Card, CardContent } from "@/components/wilderness/card";
import { RsvpButton } from "@/components/auth-buttons";

export default function LandingPage({
	release_flipper = false,
	hour_multipliers,
	base_hour_rate,
	items,
	alert_data,
	rsvp_count,
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
	alert_data?: VariantProps<typeof alertVariants> & {
		description?: string;
		iconName?: string;
	};
	rsvp_count: number;
}) {
	const { user } = usePage<SharedProps>().props;

	return (
		<>
			{alert_data && <Alert {...alert_data} />}
			<div className="bg-linear-to-b from-background from-67% to-destructive-background">
				{release_flipper && (
					<div className="w-screen flex flex-row items-center justify-center text-center p-2 bg-destructive-background text-destructive-foreground">
						THIS IS THE RELEASE VERSION.
					</div>
				)}
				<Navbar release_flipper={release_flipper} />
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
							{!user ? (
								<div className="flex flex-col gap-2 w-fit">
									<RsvpButton>
										RSVP <FlameKindling size={20} strokeWidth={3}/>
									</RsvpButton>
									<span className="text-sm text-foreground/50 font-serif italic">
										just one click — we use your hack club account
									</span>
								</div>
							):user.camp_access? (
								<Button onClick={() => router.visit("/camp")} className="w-fit">
									enter camp <MoveUpRight size={20} strokeWidth={3}/>
								</Button>
							): (
								<div className="flex flex-col gap-2 w-fit">
									<span className="font-semibold text-secondary">
										you&rsquo;re on the list, {user.name} ✓
									</span>
									<span className="text-sm text-foreground/50 font-serif italic">
										{rsvp_count} users signed up so far
									</span>
								</div>
							)}
						</div>
						<div className="col-span-1">{/* image go here */}</div>
					</div>
					<Trees />
				</div>
				<SectionWrapper className="py-7">
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
									<span className="font-bold">LOVE</span> games, that doesn’t
									mean we accept anything else, we welcome any and all software
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
				<Footer />
			</div>
		</>
	);
}
