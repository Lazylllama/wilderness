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
        <div className="flex items-center justify-between">
        <span className="text-sm font-bold">linked hackatime projects</span>
        <button type="button" onClick={onSync} disabled={syncing} className="flex cursor-pointer items-center gap-1 font-serif text-xs italic text-foreground/50 transition-colors hover:text-foreground disabled:opacity-50">
            <RefreshCw size={12} className={syncing? "animate-spin":""}/>
            {syncing? "syncing…":"resync"}
        </button>
        </div>
    </div>

    {projects.length === 0?(
        <p className="rounded-lg border border-dashed border-border p-4 text-center font-serif text-sm text-foreground/50">no hackatime projects yet. link your hackatime from the ranger post, and hit resync. if not yet, you can <a href="https://hackatime.hackclub.com/setup">setup hackatime</a></p>
    ): (
        <div>
            {projects.map((project)=> {
                const isSelected = selected.includes(project.name);
                const takenByOther = !isSelected && project.claimed_by !== null;

                return (
                    <button type="button" key={project.name} disabled={takenByOther} onClick={()=> onToggle(project.name)}>
                        <span>
                            {isSelected && <Check size={14} strokeWidth={4}/>}
                        </span>
                        <span className="flex min-w-0">
                            <span className="truncate text-sm font-semibold">
                                {project.name}
                            </span>
                            <span className="font-serif text-xs text-foreground/50">
                                {takenByOther? 'claimed by ${project.claimed_by}':"last heartbeat ${relativeTime(project.last_heartbeat)}"}
                            </span>
                        </span>
                        <span className="shrink-0 text-sm font-semibold text-primary">
                            {formatHours(project.total_seconds/3600)}
                        </span>
                    </button>
                )
            })}
        </div>
    )}
    <p className="font-serif text-xs text-foreground/40">hours from every linked project add up into this tent&rsquo;s total.</p>
}