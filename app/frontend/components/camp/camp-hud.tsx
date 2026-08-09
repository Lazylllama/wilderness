import {Link} from "@inertiajs/react";
import {formatLogs} from "@/lib/camp-layout";
import {cn} from "@/lib/utils";
import type {Camp} from "@/types/camp";

function pill({
    children,className,
}:{
    children: React.ReactNode;
    className: string;
}) {
    return (
        <div>
            {children}
        </div>
    );
}

export function CampHud({
    camp, night,onToggleNight,userName,
}: {
    camp: Camp;
    night: boolean;
}) {
    return (
        <div>
            <div className="pointer-events-auto flex items-center gap-2">
                <TreePine className="text-secondary"/>
                    <span>
                        {userName}&rsquo;s camp
                    </span>
            </div>

            <div>
                <button type="button" onClick={onToggleNight}>

                </button>
            </div>
        </div>
    )
}