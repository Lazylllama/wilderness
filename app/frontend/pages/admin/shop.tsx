import { router, usePage } from "@inertiajs/react";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { AdminShell, AdminTable, Tag } from "@/components/admin/shell";
import { Button } from "@/components/wilderness/button";
import { Card, CardContent } from "@/components/wilderness/card";
import { Input } from "@/components/wilderness/input";
import { Label } from "@/components/wilderness/label";
import { formatLogs } from "@/lib/camp-layout";

type ShopRegion = { code: string; label: string };

type AdminShopItem = {
	id: number;
	title: string | null;
	description: string | null;
	kind: string;
	image_url: string | null;
	stocked: boolean;
	stock_remaining: number | null;
	position: number;
	sold_out: boolean;
	default_price: number | null;
	prices: Record<string, number>;
};

type FormState = {
	title: string;
	description: string;
	kind: string;
	image_url: string;
	position: string;
	stock_remaining: string;
	stocked: boolean;
	prices: Record<string, string>;
};

const KIND_BLURBS: Record<string, string> = {
	gear: "physical — has to be mailed",
	provision: "a code or a key, handed over instantly",
	grant: "funding, no parcel",
};

const SELECT_CLASS =
	"h-12 w-full rounded-lg border border-border bg-card px-3 text-xl text-foreground";

function blankForm(regions: ShopRegion[]): FormState {
	return {
		title: "",
		description: "",
		kind: "gear",
		image_url: "",
		position: "0",
		stock_remaining: "",
		stocked: false,
		prices: Object.fromEntries(regions.map((region) => [region.code, ""])),
	};
}

function formFor(item: AdminShopItem, regions: ShopRegion[]): FormState {
	return {
		title: item.title ?? "",
		description: item.description ?? "",
		kind: item.kind,
		image_url: item.image_url ?? "",
		position: String(item.position),
		stock_remaining:
			item.stock_remaining === null ? "" : String(item.stock_remaining),
		stocked: item.stocked,
		prices: Object.fromEntries(
			regions.map((region) => {
				const logs = item.prices[region.code];
				return [region.code, logs === undefined ? "" : String(logs)];
			}),
		),
	};
}

export default function AdminShop({
	items,
	regions,
	kinds,
	totals,
	flash_notice,
}: {
	items: AdminShopItem[];
	regions: ShopRegion[];
	kinds: string[];
	totals: { items: number; stocked: number; sold_out: number };
	flash_notice: string | null;
}) {
	const { props } = usePage<{ errors?: Record<string, string | string[]> }>();
	const errors = props.errors ?? {};

	const [editingId, setEditingId] = useState<number | null>(null);
	const [form, setForm] = useState<FormState | null>(null);

	function close() {
		setForm(null);
		setEditingId(null);
	}

	function openNew() {
		setEditingId(null);
		setForm(blankForm(regions));
	}

	function openEdit(item: AdminShopItem) {
		setEditingId(item.id);
		setForm(formFor(item, regions));
	}

	function submit(event: React.FormEvent) {
		event.preventDefault();
		if (!form) return;

		const options = { preserveScroll: true, onSuccess: close };

		if (editingId === null) {
			router.post("/admin/shop", form, options);
		} else {
			router.patch(`/admin/shop/${editingId}`, form, options);
		}
	}

	function toggleStocked(item: AdminShopItem) {
		router.patch(
			`/admin/shop/${item.id}`,
			{ stocked: !item.stocked },
			{ preserveScroll: true },
		);
	}

	function remove(item: AdminShopItem) {
		if (!window.confirm(`pull "${item.title}" off the shelf for good?`)) return;
		router.delete(`/admin/shop/${item.id}`, { preserveScroll: true });
	}

	return (
		<AdminShell
			title="the shelf"
			subtitle="what the quartermaster is stocking"
			flashNotice={flash_notice}
		>
			<div className="flex flex-col gap-4">
				<div className="grid grid-cols-3 gap-4">
					<Summary label="Items" value={totals.items} />
					<Summary label="On the shelf" value={totals.stocked} />
					<Summary label="Sold out" value={totals.sold_out} />
				</div>

				<div className="flex flex-row justify-end">
					{form === null ? (
						<Button onClick={openNew}>
							<Plus size={18} strokeWidth={3} /> stock something
						</Button>
					) : (
						<Button variant="outline" onClick={close}>
							<X size={18} strokeWidth={3} /> close
						</Button>
					)}
				</div>

				{form !== null && (
					<ItemForm
						form={form}
						onChange={setForm}
						regions={regions}
						kinds={kinds}
						editing={editingId !== null}
						errors={errors}
						onSubmit={submit}
					/>
				)}

				<AdminTable
					headers={["item", "kind", "prices", "stock", "slot", "shelf", ""]}
				>
					{items.length === 0 && (
						<tr>
							<td
								colSpan={7}
								className="px-4 py-8 text-center font-serif italic text-foreground/50"
							>
								the shelf is bare. stock something.
							</td>
						</tr>
					)}
					{items.map((item) => (
						<tr
							key={item.id}
							className="border-t border-border align-top transition-colors hover:bg-background/40"
						>
							<td className="px-4 py-3">
								<div className="flex flex-col">
									<span className="font-semibold">{item.title}</span>
									{item.description && (
										<span className="font-serif text-sm text-foreground/50">
											{item.description}
										</span>
									)}
								</div>
							</td>
							<td className="px-4 py-3">
								<span className="font-mono text-sm text-foreground/67">
									{item.kind}
								</span>
							</td>
							<td className="px-4 py-3">
								<PriceCell item={item} regions={regions} />
							</td>
							<td className="whitespace-nowrap px-4 py-3 text-sm">
								<StockCell item={item} />
							</td>
							<td className="px-4 py-3 text-sm text-foreground/67">
								{item.position}
							</td>
							<td className="px-4 py-3">
								<button type="button" onClick={() => toggleStocked(item)}>
									<Tag on={item.stocked} onLabel="stocked" offLabel="hidden" />
								</button>
							</td>
							<td className="px-4 py-3">
								<div className="flex flex-row gap-3">
									<button
										type="button"
										onClick={() => openEdit(item)}
										className="text-secondary transition-colors hover:text-foreground"
									>
										<Pencil size={18} strokeWidth={2.5} />
									</button>
									<button
										type="button"
										onClick={() => remove(item)}
										className="text-foreground/40 transition-colors hover:text-destructive-foreground"
									>
										<Trash2 size={18} strokeWidth={2.5} />
									</button>
								</div>
							</td>
						</tr>
					))}
				</AdminTable>
			</div>
		</AdminShell>
	);
}

function PriceCell({
	item,
	regions,
}: {
	item: AdminShopItem;
	regions: ShopRegion[];
}) {
	const priced = regions.filter(
		(region) => item.prices[region.code] !== undefined,
	);

	if (priced.length === 0 && item.default_price === null) {
		return (
			<span className="text-sm font-semibold text-caution-foreground">
				no price — hidden from everyone
			</span>
		);
	}

	return (
		<div className="flex flex-col gap-1">
			{priced.map((region) => (
				<div key={region.code} className="flex gap-2 text-sm">
					<span className="font-mono uppercase text-foreground/40">
						{region.code}
					</span>
					<span className="font-semibold text-primary">
						🪵 {formatLogs(item.prices[region.code])}
					</span>
				</div>
			))}
			{item.default_price !== null && (
				<span className="font-serif text-xs text-foreground/40">
					elsewhere 🪵 {formatLogs(item.default_price)}
				</span>
			)}
		</div>
	);
}

function StockCell({ item }: { item: AdminShopItem }) {
	if (item.stock_remaining === null) {
		return <span className="text-foreground/60">unlimited</span>;
	}
	if (item.sold_out) {
		return (
			<span className="font-semibold text-destructive-foreground">
				sold out
			</span>
		);
	}
	return <span className="font-semibold">{item.stock_remaining} left</span>;
}

function ItemForm({
	form,
	onChange,
	regions,
	kinds,
	editing,
	errors,
	onSubmit,
}: {
	form: FormState;
	onChange: (next: FormState) => void;
	regions: ShopRegion[];
	kinds: string[];
	editing: boolean;
	errors: Record<string, string | string[]>;
	onSubmit: (event: React.FormEvent) => void;
}) {
	function set<K extends keyof FormState>(key: K, value: FormState[K]) {
		onChange({ ...form, [key]: value });
	}

	function setPrice(code: string, value: string) {
		onChange({ ...form, prices: { ...form.prices, [code]: value } });
	}

	const messages = Object.entries(errors);

	return (
		<Card>
			<CardContent className="p-5">
				<form onSubmit={onSubmit} className="flex flex-col gap-5">
					{messages.length > 0 && (
						<div className="rounded-lg border border-destructive-foreground/40 bg-destructive-background px-4 py-3 text-sm font-semibold text-destructive-foreground">
							{messages.map(([field, message]) => (
								<div key={field}>
									{field} {Array.isArray(message) ? message.join(", ") : message}
								</div>
							))}
						</div>
					)}

					<div className="grid grid-cols-2 gap-4">
						<Label>
							title
							<Input
								className="w-full"
								value={form.title}
								onChange={(event) => set("title", event.target.value)}
								placeholder="mechanical keyboard"
								required
							/>
						</Label>
						<Label>
							kind
							<select
								className={SELECT_CLASS}
								value={form.kind}
								onChange={(event) => set("kind", event.target.value)}
							>
								{kinds.map((kind) => (
									<option key={kind} value={kind}>
										{kind}
									</option>
								))}
							</select>
							<span className="font-serif text-xs font-normal text-foreground/50">
								{KIND_BLURBS[form.kind]}
							</span>
						</Label>
					</div>

					<Label>
						description
						<Input
							className="w-full"
							value={form.description}
							onChange={(event) => set("description", event.target.value)}
							placeholder="for hours that sound as good as they count."
						/>
					</Label>

					<div className="grid grid-cols-3 gap-4">
						<Label>
							image url
							<Input
								className="w-full"
								value={form.image_url}
								onChange={(event) => set("image_url", event.target.value)}
								placeholder="https://…"
							/>
						</Label>
						<Label>
							stock
							<Input
								className="w-full"
								type="number"
								min={0}
								value={form.stock_remaining}
								onChange={(event) => set("stock_remaining", event.target.value)}
								placeholder="unlimited"
							/>
							<span className="font-serif text-xs font-normal text-foreground/50">
								blank means unlimited
							</span>
						</Label>
						<Label>
							slot
							<Input
								className="w-full"
								type="number"
								value={form.position}
								onChange={(event) => set("position", event.target.value)}
							/>
							<span className="font-serif text-xs font-normal text-foreground/50">
								lower sits earlier on the shelf
							</span>
						</Label>
					</div>

					<div className="flex flex-col gap-2">
						<span className="text-sm font-bold text-foreground">
							price per region
						</span>
						<span className="font-serif text-xs text-foreground/50">
							in logs. leave a region blank and the item isn&rsquo;t offered
							there.
						</span>
						<div className="grid grid-cols-3 gap-3">
							{regions.map((region) => (
								<Label key={region.code}>
									{region.label}
									<Input
										className="w-full"
										type="number"
										min={0}
										value={form.prices[region.code] ?? ""}
										onChange={(event) =>
											setPrice(region.code, event.target.value)
										}
										placeholder="—"
									/>
								</Label>
							))}
						</div>
					</div>

					<div className="flex flex-row items-center justify-between gap-4">
						<label className="flex flex-row items-center gap-2 text-sm font-bold text-foreground">
							<input
								type="checkbox"
								checked={form.stocked}
								onChange={(event) => set("stocked", event.target.checked)}
								className="size-4 accent-primary"
							/>
							on the shelf (visible in the shop)
						</label>
						<Button type="submit">{editing ? "save" : "stock it"}</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}

function Summary({ label, value }: { label: string; value: number }) {
	return (
		<Card>
			<CardContent className="flex flex-col gap-1 p-5">
				<span className="font-serif text-sm text-foreground/50">{label}</span>
				<span className="text-3xl font-bold text-primary">{value}</span>
			</CardContent>
		</Card>
	);
}
