import { useMemo } from "react";

type EmojiSnowProps = {
	count?: number;
};

export function EmojiSnow({ count = 20 }: EmojiSnowProps) {
	const flakes = useMemo(
		() =>
			Array.from({ length: count }).map(() => ({
				id: crypto.randomUUID(),
				left: `${Math.random() * 100}%`,
				animationDelay: `${Math.random() * 10}s`,
				animationDuration: `${5 + Math.random() * 5}s`,
			})),
		[count],
	);

	return (
		<div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
			{flakes.map((flake) => (
				<span
					key={flake.id}
					className="absolute top-[-10%] text-4xl opacity-50 animate-snow"
					style={{
						left: flake.left,
						animationDelay: flake.animationDelay,
						animationDuration: flake.animationDuration,
					}}
				>
					❄️
				</span>
			))}
		</div>
	);
}
