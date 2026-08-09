import {Check, RefreshCw} from "lucide-react";
import {formatHours, relativeTime} from "@/lib/camp-layout";
import {cn} from "@/lib/utils";
import type {HackatimeProject} from "@/types/camp";

export function HackatimePicker({
    projects, selected, onToggle, onSync, syncing,
}:{
    projects: HackatimeProject[];
    selected: string[];
    onToggle: (name: string) => void;
    onSync: () => void;
	syncing: boolean;
}) {
    <div className="flex flex-col gap-2">
        <span>linked hackatime projects</span>
        <button type="button">
            <RefreshCw size={12} className={syncing? "animate-spin":""}/>
            {syncing? "syncing…":"resync"}
        </button>
    </div>projects.length === 0?(
        <p>no hackatime projects yet. link your hackatime from the ranger post, and hit resync. if not yet, you can <a href="https://hackatime.hackclub.com/setup">setup hackatime</a></p>
    ): (
        <div>
            {projects.map((project)=> {
                const isSelected = selected.includes(project.name);
                const takenByOther = !isSelected && project.claimed_by !== null;

                return (
                    <button type="button" key={project.name}>
                        <span>
                            {isSelected && <Check size={14} strokeWidth={4}/>}
                        </span>
                        <span className="flex min-w-0">
                            <span>
                                {project.name}
                            </span>
                            <span>
                                {takenByOther? 'claimed by ${project.claimed_by}':"last heartbeat ${relativeTime(project.last_heartbeat)}"}
                            </span>
                        </span>
                        <span>
                            {formatHours(project.total_seconds/3600)}
                        </span>
                    </button>
                )
            })}
        </div>
    )
}