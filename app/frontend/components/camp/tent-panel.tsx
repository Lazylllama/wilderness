import {Dialog} from "@base-ui/react";
import {router, useForm} from "@inertiajs/react";
import {Github, Globe} from "lucide-react";
import {Button} from "@/components/wilderness/button";
import {Input} from "@/components/wilderness/input";
import {Label} from "@/components/wilderness/label";
import {
    formatLogs,
    formatHours,
    HEAT_TIERS,
} from "@/lib/camp-layout";
import type {HackatimeProject, Tent} from "@/types/camp";
import {HackatimePicker} from "./hackatime-picker";
import {TentArt} from "./art";


const SHIP_MINIMUM_HOURS = 1;
type TentPanel = {
    tent: Tent | null;
    plotIndex: number | null;
    projects: HackatimeProject[];
};

export function TentPanel({
    tent, plotIndex, projects,
}:TentPanel) {
    return (
        <Dialog.root>
            <Dialog.portal>
                <Dialog.backdrop/>
                <Dialog.Popup>
                    {open && (
                        <TentPanelBody key={tent?.id?? `new-${plotIndex}`} tent={tent} plotIndex={plotIndex} projects={projects}/>
                    )}
                </Dialog.Popup>
            </Dialog.portal>
        </Dialog.root>
    );
}

function TentPanelBody({
    tent, plotIndex, projects, 
}: {
    tent: Tent | null;
    plotIndex: number | null;
	projects: HackatimeProject[];
}) {
    const isNew = tent === null;
    const [syncing, setSyncing] = useState(false);
    const form = useForm({
        name: tent?.name?? "",
        description: tent?.description?? "",
        repo_url: tent?.repo_url?? "",
        demo_url: tent?.demo_url?? "",
        hackatime_projects: tent?.hackatime_projects?? ([] as string[]),
        plot_index: tent?.plot_index?? plotIndex?? 0,
    });

    const previewHours = projects.filter((p)=> form.data.hackatime_projects.includes(p.name))
    .reduce((sum, p)=> sum + p.total_seconds, 0)/3600;
    const hours =  isNew? previewHours: tent.hours;
    const tier = HEAT_TIERS[heatTier];
    const heatTier = isNew? tierForHours(hours): tent.heat_tier;

    const logs = isNew? logsFor(hours, heatTier): tent.logs;
    const canShip = !isNew && tent.status === "pitched" && hours >= SHIP_MINIMUM_HOURS;

    function toggleProject(name: string) {
        const current = form.data.hackatime_projects;
        form.setData(
            "hackatime_projects",
            current.includes(name)? current.filter((item) => item !== name): [...current, name],
        );
    }
    function resync() {
        setSyncing(true);
        router.post(
            "/tents/sync", {}, {
                preserveScroll: true,
                onFinish:()=> setSyncing(false),
            },
        );
    }
    function submit(event: React.FormEvent) {
        event.preventDefault();
        const options = {preserveScroll: true, onSuccess: onClose};
        if (isNew) form.post("/tents", options);
        else form.patch(`/tents/${tent.id}`, options);
    }
    function ship() {
        if ((!tent) return;
		router.post(`/tents/${tent.id}/ship`, {}, {onSuccess: onClose});)
    }

    return (
        <form onSubmit={submit}>
            <div>
                <TentArt flag={tier.flag} className="w-20 shrink-0"/>
                <div>
                    <Dialog.Title className="text-2xl font-semibold">
						{isNew? "pitch a new tent":tent.name}
					</Dialog.Title>
                    <div>
                        <span>
                            {tier.label} · {tier.rate} logs/hour
                        </span>
                    </div>
                </div>
            </div>
        </form>
    )
}