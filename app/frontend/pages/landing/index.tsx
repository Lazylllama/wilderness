import { Navbar } from "@/components/navbar";
import { PageWrapper } from "@/components/page-wrapper";

export default function LandingPage() {
	return (
		<PageWrapper>
			<Navbar />
			<div className="w-full h-[750px] bg-linear-to-b from-night-blue to-background"></div>
		</PageWrapper>
	);
}
