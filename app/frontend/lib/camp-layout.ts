import type {FireState, HeatTier} from "@/types/camp";

export const PLOTS = [
    {x: 25, y: 50},
    {x: 40, y: 40},
    {x: 65, y: 40},
] as const;

export const PLOT_COUNT = PLOTS.length;
export const FIRE = {x: 50, y: 58} as const;
export const CART = {x: 15, y: 95} as const;

export function plotFor(index: number) {
	return PLOTS[index % PLOTS.length];
}

export function depthScale(y: number) {
	return 0.78 + (y/100) * 0.46;
}
export function depthZ(y: number) {
    return Math.round(y * 10);
}
export function firelight(x: number, y: number) {
    const ax = (x-FIRE.x)/46;
    const ay = (y-FIRE.y)/42;
    return Math.max(0,1-Math.hypot(ax, ay));
}

export function jitter(seed: number, amount = 1.4) {
    const x = Math.sin(seed*12.9898)*43758.5453;
}