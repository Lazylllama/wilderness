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