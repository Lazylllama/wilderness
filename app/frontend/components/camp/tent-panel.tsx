import { Dialog } from "@base-ui/react";
import { router, useForm } from "@inertiajs/react";
import { DogIcon, Globe, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/wilderness/button";
import { Input } from "@/components/wilderness/input";
import { Label } from "@/components/wilderness/label";
import {
	formatHours,
	formatLogs,
	HEAT_TIERS,
	logsFor,
	relativeTime,
	tierForHours,
} from "@/lib/camp-layout";
import type { HackatimeProject, Tent } from "@/types/camp";
import { TentArt } from "./art";
import { HackatimePicker } from "./hackatime-picker";

const SHIP_MINIMUM_HOURS = 1;
type TentPanel = {
	tent: Tent | null;
	plotIndex: number | null;
	projects: HackatimeProject[];
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export function TentPanel({
	tent,
	plotIndex,
	projects,
	open,
	onOpenChange,
}: TentPanel) {
	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Portal>
				<Dialog.Backdrop className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
				<Dialog.Popup className="fixed left-1/2 top-1/2 z-50 max-h-[90dvh] w-[min(42rem,92vw)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-border bg-card p-6">
					{open && (
						<TentPanelBody
							key={tent?.id ?? `new-${plotIndex}`}
							tent={tent}
							plotIndex={plotIndex}
							projects={projects}
							onClose={() => onOpenChange(false)}
						/>
					)}
				</Dialog.Popup>
			</Dialog.Portal>
		</Dialog.Root>
	);
}

function TentPanelBody({
	tent,
	plotIndex,
	projects,
	onClose,
}: {
	tent: Tent | null;
	plotIndex: number | null;
	projects: HackatimeProject[];
	onClose: () => void;
}) {
	const isNew = tent === null;
	const [syncing, setSyncing] = useState(false);
	const form = useForm({
		name: tent?.name ?? "",
		description: tent?.description ?? "",
		repo_url: tent?.repo_url ?? "",
		demo_url: tent?.demo_url ?? "",
		hackatime_projects: tent?.hackatime_projects ?? ([] as string[]),
		plot_index: tent?.plot_index ?? plotIndex ?? 0,
	});

	const previewHours =
		projects
			.filter((p) => form.data.hackatime_projects.includes(p.name))
			.reduce((sum, p) => sum + p.total_seconds, 0) / 3600;
	const hours = isNew ? previewHours : tent.hours;
	const heatTier = isNew ? tierForHours(hours) : tent.heat_tier;
	const tier = HEAT_TIERS[heatTier];

	const logs = isNew ? logsFor(hours, heatTier) : tent.logs;
	const canShip =
		!isNew && tent.status === "pitched" && hours >= SHIP_MINIMUM_HOURS;

	function toggleProject(name: string) {
		const current = form.data.hackatime_projects;
		form.setData(
			"hackatime_projects",
			current.includes(name)
				? current.filter((item) => item !== name)
				: [...current, name],
		);
	}

	function resync() {
		setSyncing(true);
		router.post(
			"/tents/sync",
			{},
			{
				preserveScroll: true,
				onFinish: () => setSyncing(false),
			},
		);
	}

	function submit(event: React.FormEvent) {
		event.preventDefault();
		const options = { preserveScroll: true, onSuccess: onClose };
		if (isNew) form.post("/tents", options);
		else form.patch(`/tents/${tent.id}`, options);
	}
	function ship() {
		if (!tent) return;
		router.post(`/tents/${tent.id}/ship`, {}, { onSuccess: onClose });
	}

	return (
		<form onSubmit={submit}>
			<div>
				<TentArt flag={tier.flag} className="w-20 shrink-0" />
				<div>
					<Dialog.Title className="text-2xl font-semibold">
						{isNew ? "pitch a new tent" : tent.name}
					</Dialog.Title>
					<div>
						<span>
							{tier.label} · {tier.rate} logs/hr
						</span>

						{!isNew && (
							<span>synced {relativeTime(tent.hackatime_synced_at)}</span>
						)}
					</div>
					<Dialog.Description className="font-serif text-sm text-foreground/67">
						{isNew
							? "name it, link the hackatime projects you'll code in, and it goes up in the clearing."
							: "everything about this project lives here."}
					</Dialog.Description>
				</div>
				<Dialog.Close>
					<X size={18} strokeWidth={3} />
				</Dialog.Close>
			</div>

			<div>
				<Stat value={formatHours(hours)} label="hours logged" />
				<Stat value={formatLogs(logs)} label="logs earned" />
			</div>
			<Field label="project name" error={form.errors.name?.[0]}>
				<Input
					value={form.data.name}
					onChange={(e) => form.setData("name", e.target.value)}
					required
					maxLength={60}
					placeholder="solder-sim"
				/>
			</Field>

			<Field label="what is it?" error={form.errors.description?.[0]}>
				<textarea
					value={form.data.description}
					onChange={(e) => form.setData("description", e.target.value)}
					placeholder="a browser circuit app where you can burn your fingers, of course virtually."
					rows={3}
					maxLength={267}
				/>
			</Field>

			<div className="grid gap-4 sm:grid-cols-2">
				<Field label="github repo">
					<div className="relative">
						<DogIcon
							size={18}
							className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40"
						/>
						<Input
							type="url"
							inputMode="url"
							value={form.data.repo_url}
							onChange={(e) => form.setData("repo_url", e.target.value)}
							placeholder="https://github.com/your_username/..."
							className="w-full pl-10 text-base"
						/>
					</div>
				</Field>
				<Field label="demo url" error={form.errors.demo_url?.[0]}>
					<div className="relative">
						<Globe size={18} />
						<Input
							type="url"
							inputMode="url"
							value={form.data.demo_url}
							onChange={(e) => form.setData("demo_url", e.target.value)}
							placeholder="https://wilderness.hackclub.com"
							className="w-full pl-10 text-base"
						/>
					</div>
				</Field>
			</div>

			<HackatimePicker
	            projects={projects}
	            selected={form.data.hackatime_projects}
	            onToggle={toggleProject}
	            onSync={resync}
	            syncing={syncing}
            />
			{form.errors.hackatime_projects && (
				<p>{form.errors.hackatime_projects}</p>
			)}

			<div>
				<Button type="submit" disabled={form.processing}>
					{form.processing ? "saving…" : isNew ? "pitch it" : "save changes"}
				</Button>

				{canShip && (
					<Button type="button" variant="secondary" onClick={ship}>
						ship it!
					</Button>
				)}

				{!isNew && !canShip && tent.status === "pitched" && (
					<span>
						{formatHours(Math.max(0, SHIP_MINIMUM_HOURS - hours))} until you can
						ship
					</span>
				)}

				<Button type="button" onClick={onClose}>
					not yet
				</Button>
			</div>
		</form>
	);
}
function Stat({ value, label }: { value: string; label: string }) {
	return (
		<div className="rounded-xl border border-border p-4">
			<div className="text-3xl font-semibold text-primary">{value}</div>
			<div className="font-serif text-sm text-foreground/60">{label}</div>
		</div>
	);
}

function Field({
	label,
	error,
	children,
}: {
	label: string;
	error?: string;
	children: React.ReactNode;
}) {
	return (
		<Label className="w-full">
			{label}
			{children}
			{error && (
				<span className="text-xs font-normal text-destructive-foreground">
					{error}
				</span>
			)}
		</Label>
	);
}
