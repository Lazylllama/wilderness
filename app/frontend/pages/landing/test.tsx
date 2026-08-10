import { AlertTriangle, CircleAlert, SaveIcon } from "lucide-react";
import { Alert } from "@/components/wilderness/alert";

export default function TestPage() {
	return (
		<div className="p-24 flex flex-1 flex-col gap-4">
			<h1 className="text-3xl font-bold mb-4">Alerts</h1>
			<Alert
				title="This is a warning alert"
				description="bug yappa yapp caution thingy thingy wow i need to yap so much to make this longer omg omg when does this end does it ever end omg"
				variant="warning"
				icon={AlertTriangle}
			/>
			<Alert
				title="This is a normal alert"
				description="ts a description for normal alert"
				variant="normal"
				icon={SaveIcon}
			/>
			<Alert
				title="This is a destructive alert"
				description="cooked gngs"
				variant="destructive"
				icon={CircleAlert}
			/>
		</div>
	);
}
