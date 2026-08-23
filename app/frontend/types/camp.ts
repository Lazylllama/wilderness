export type HeatTier = "kindling" | "campfire" | "bonfire" | "wildfire";
export type FireState =
	| "embers"
	| "smoldering"
	| "crackling"
	| "roaring"
	| "blazing";
export type TentStatus = 
	| "pitched"
	| "submitted"
	| "approved"
	| "changes_requested"
	| "shipped";
export type HackatimeProject = {
	name: string;
	total_seconds: number;
	total_heartbeats: number;
	languages: string[];
	repo_url: string | null;
	first_heartbeat: string | null;
	last_heartbeat: string | null;
	archived: boolean;
	claimed_by: string | null;
};

export type Tent = {
	id: number;
	name: string;
	description: string | null;
	banner: string | null;
	repo_url: string | null;
	demo_url: string | null;
	hackatime_projects: string[];
	hours: number;
	logs: number;
	heat_tier: HeatTier;
	status: TentStatus;
	plot_index: number;
	last_heartbeat_at: string | null;
	hackatime_synced_at: string | null;
	shipped_at: string | null;
};

export type Camp = {
	total_hours: number;
	fire_state: FireState;
	streak: number;
	logs_balance: number;
	plot_count: number;
};

export type CampPageProps = {
	camp: Camp;
	tents: Tent[];
	hackatime_projects: HackatimeProject[];
};
