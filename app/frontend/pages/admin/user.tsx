type Camper = {
	id: number;
	name: string;
	email: string;
	slack_id: string | null;
	verification_status: string | null;
	admin: boolean;
	camp_access: boolean;
	actor_enabled: boolean;
	rsvped_at: string | null;
	tents_count: number;
	balance: number;
	region: string | null;
	hackatime_connected: boolean;
	hackatime_synced_at: string | null;
	streak: number;
	fire_state: string;
};
type CamperProject = {
	id: number;
	name: string;
	status: string;
	hours: number;
	heat_tier: HeatTier;
	repo_url: string | null;
	demo_url: string | null;
};
type Entry = {
	id: number;
	amount: number;
	source: string;
	memo: string | null;
	created_at: string;
};

const SOURCE_LABELS: Record<string, string> = {
	adjustment: "by hand",
	shop_purchase: "spent in the shop",
	ship_submission: "earned by shipping a project",
};
export default function AdminUser({
    camper,
	tents,
	transactions,
	flash_notice,
})