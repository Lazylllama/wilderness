import {router} from "@inertiajs/react";
import {AdminShell, Tag} from "@/components/admin/shell";
import {Button} from "@/components/wilderness/button";

type AdminFlag = {name: string; enabled: boolean; actors: number};

const BLURBS: Record<string, string> = {
	camp: "opens camp to everyone, yippee",
	release: "users can see its now open to go in",
};

export default function AdminFlags({
    flags, flash_notice,
}: {
    flags: AdminFlag[];
	flash_notice: string | null;
}) {
    return (
        <AdminShell title="big switches" subtitle="flip them to enable/disable the feature" flashNotice={flash_notice}>
            <div className="flex flex-col gap-2">
                {flags.map((flag) => (
                    <div key={flag.name}>
                        <div className="flex flex-col gap-0.5">
                            <span className="font-semibold text-lg">{flag.name}</span>
							<span className="font-serif text-sm text-foreground/50">
								{BLURBS[flag.name]}
							</span>
                            {flag.actors > 0 && (
								<span className="font-serif text-sm text-foreground/40">
									{flag.actors} invited
								</span>
							)}
                        </div>
                        <div className="flex flex-row items-center gap-3">
                            <Tag on={flag.enabled} onLabel="lit" offLabel="out"/>
                            <Button variant={flag.enabled? "outline": "primary"} onClick={() =>router.patch(`/admin/flags/${flag.name}`, {},{preserveScroll: true})}>
                                {flag.enabled? "yes": "no"}
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </AdminShell>
    );
}