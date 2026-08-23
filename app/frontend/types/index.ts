export type FlashData = {
	notice?: string;
	alert?: string;
};
export type User = {
	id: number;
	name: string;
	email: string;
	slack_id: string | null;
	verification_status: string | null;
	rsvped: boolean;
	admin: boolean;
	camp_access: boolean;
};
export type SharedProps = {
	user: User | null;
};
