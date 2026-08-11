import { type ClassValue, clsx } from "clsx";
import {
	AlertTriangleIcon,
	CircleAlertIcon,
	type LucideIcon,
	SaveIcon,
	TentIcon,
} from "lucide-react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function IconNameToLucideIcon(iconName: string): LucideIcon {
	const rawIcon = iconName.replace(/Icon$/, "");

	switch (rawIcon) {
		case "AlertTriangle":
			return AlertTriangleIcon;
		case "CircleAlert":
			return CircleAlertIcon;
		case "Save":
			return SaveIcon;
		default:
			return TentIcon;
	}
}
