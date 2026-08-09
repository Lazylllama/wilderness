import type { FireState, HeatTier } from "@/types/camp";

export const PLOTS = [
	{ x: 25, y: 50 },
	{ x: 40, y: 40 },
	{ x: 65, y: 40 },
] as const;

export const PLOT_COUNT = PLOTS.length;
export const FIRE = { x: 50, y: 58 } as const;
export const CART = { x: 15, y: 95 } as const;

export function plotFor(index: number) {
	return PLOTS[index % PLOTS.length];
}

export function depthScale(y: number) {
	return 0.78 + (y / 100) * 0.46;
}
export function depthZ(y: number) {
	return Math.round(y * 10);
}
export function firelight(x: number, y: number) {
	const ax = (x - FIRE.x) / 46;
	const ay = (y - FIRE.y) / 42;
	return Math.max(0, 1 - Math.hypot(ax, ay));
}

export function jitter(seed: number, amount = 1.4) {
	const x = Math.sin(seed * 12.9898) * 43758.5453;
	return (x - Math.floor(x) - 0.5) * 2 * amount;
}

export const HEAT_TIERS: Record<
	HeatTier,
	{ label: string; rate: number; flag: string; text: string; at: number }
> = {
	kindling: {
		label: "kindling",
		rate: 80,
		flag: "#8bab6b",
		text: "text-secondary",
		at: 0,
	},
	campfire: {
		label: "campfire",
		rate: 90,
		flag: "#f1cf77",
		text: "text-pill-foreground",
		at: 10,
	},
	bonfire: {
		label: "bonfire",
		rate: 100,
		flag: "#f4a94e",
		text: "text-primary",
		at: 25,
	},
	wildfire: {
		label: "wildfire",
		rate: 120,
		flag: "#e23b2e",
		text: "text-destructive-foreground",
		at: 40,
	},
};

export const TIER_ORDER: HeatTier[] = [
	"kindling",
	"campfire",
	"bonfire",
	"wildfire",
];

export function tierForHours(hours: number): HeatTier {
	let tier: HeatTier = "kindling";
	for (const candidate of TIER_ORDER) {
		if (hours >= HEAT_TIERS[candidate].at) tier = candidate;
	}
	return tier;
}

export function logsFor(hours: number, tier: HeatTier) {
	return Math.round(hours * HEAT_TIERS[tier].rate);
}

export const FIRE_STATES: Record<
	FireState,
	{ label: string; flame: number; glow: number }
> = {
	embers: { label: "down to embers", flame: 0.5, glow: 0.3 },
	smoldering: { label: "smoldering", flame: 0.7, glow: 0.45 },
	crackling: { label: "crackling", flame: 0.9, glow: 0.65 },
	roaring: { label: "roaring", flame: 1.1, glow: 0.85 },
	blazing: { label: "blazing", flame: 1.3, glow: 1 },
};

export function formatHours(hours: number) {
	if (hours >= 100) return `${Math.round(hours)}h`;
	return `${Number(hours.toFixed(1))}h`;
}

export function formatLogs(logs: number) {
	return logs.toLocaleString("en-US");
}

export function relativeTime(iso: string | null) {
	if (!iso) return "never";
	const minutes = Math.round((Date.now() - new Date(iso).getTime()) / 60_000);
	if (minutes < 2) return "just now";
	if (minutes < 60) return `${minutes}m ago`;
	const hours = Math.round(minutes / 60);
	if (hours < 24) return `${hours}h ago`;
	return `${Math.round(hours / 24)}d ago`;
}
