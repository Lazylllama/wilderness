type ArtProps = {className?: string};
export function TentArt({ flag, className }: ArtProps & { flag: string }) {
	return (
		<svg viewBox="0 0 140 140" className={className} aria-hidden="true">
			<ellipse cx="70" cy="124" rx="50" ry="11" fill="#0d1409" opacity="0.45" />
			<path d="M70 34 L10 124" stroke="#6b5c3a" strokeWidth="1.5" opacity="0.5" />
			<path d="M70 34 L130 124" stroke="#6b5c3a" strokeWidth="1.5" opacity="0.5" />
			<rect x="68" y="4" width="4" height="34" rx="2" fill="#7a5c36" />
			<path d="M72 6 L101 14 L72 22 Z" fill={flag} />
			<path d="M70 28 L118 124 H70 Z" fill="#cdc2a4" />
			<path d="M70 28 L22 124 H70 Z" fill="#e9e1cb" />
			<path d="M70 28 L91 124 H49 Z" fill="#f5efdd" />
			<path
				d="M70 60 C79 78 82 104 80 124 H60 C58 104 61 78 70 60 Z"
				fill="#241f14"
			/>
			<path d="M70 64 C77 80 79 104 78 124 H70 Z" fill="#332b1a" />
		</svg>
	);
}

export function CampfireArt({ className }: ArtProps) {
	return (
		<svg viewBox="0 0 120 120" className={className} aria-hidden="true">
			<ellipse cx="60" cy="102" rx="40" ry="9" fill="#0d1409" opacity="0.45" />
			<ellipse cx="60" cy="98" rx="33" ry="8" fill="#2b2c21" />
			<rect
				x="24"
				y="86"
				width="72"
				height="11"
				rx="5.5"
				fill="#5b3f26"
				transform="rotate(-9 60 92)"
			/>
			<rect
				x="24"
				y="86"
				width="72"
				height="11"
				rx="5.5"
				fill="#734f2f"
				transform="rotate(10 60 92)"
			/>
			<g style={{ transformOrigin: "60px 92px" }} className="animate-flicker">
				<path
					d="M60 14 C75 42 85 55 85 70 C85 85 74 95 60 95 C46 95 35 85 35 70 C35 55 45 42 60 14 Z"
					fill="url(#camp-flame-outer)"
				/>
			</g>
			<g
				style={{ transformOrigin: "60px 92px" }}
				className="animate-flicker-fast"
			>
				<path
					d="M60 42 C68 60 73 67 73 76 C73 86 67 92 60 92 C53 92 47 86 47 76 C47 67 52 60 60 42 Z"
					fill="url(#camp-flame-inner)"
				/>
			</g>
			<defs>
				<linearGradient
					id="camp-flame-outer"
					x1="60"
					y1="14"
					x2="60"
					y2="95"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#f4a94e" />
					<stop offset="0.6" stopColor="#e8813c" />
					<stop offset="1" stopColor="#e23b2e" />
				</linearGradient>
				<linearGradient
					id="camp-flame-inner"
					x1="60"
					y1="42"
					x2="60"
					y2="92"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#fdf3cd" />
					<stop offset="1" stopColor="#f4a94e" />
				</linearGradient>
			</defs>
		</svg>
	);
}

