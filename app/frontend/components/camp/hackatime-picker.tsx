import {formatHours, relativeTime} from "@/lib/camp-layout";
import type {HackatimeProject} from "@/types/camp";

export function HackatimePicker({
    projects
}:{
    projects: HackatimeProject[];
}) {
    <div className="flex flex-col gap-2">
        <span>linked hackatime projects</span>
        <button type="button">
            <RefreshCw size={12} className={syncing? "animate-spin":""}/>
            {syncing? "syncing…":"resync"}
        </button>
    </div>

    {projects.length === 0?(
        <p>no hackatime projects yet. link your hackatime from the ranger post, and hit resync. if not yet, you can setup hackatime </p>
    )}
}