import {useMemo} from "react";
export function Fireflies({count = 14}: {count?: number}) {
    const flies = useMemo(
        () => Array.from({length: count}).map(()=> ({
            id: crypto.randomUUID(),
            left: `${10 + Math.random()*80}%`,
			top: `${35 + Math.random()*55}%`,
            size: 3 + Math.random()*3,
            delay: `${Math.random()*6}s`,
			duration: `${6 + Math.random()*6}s`,
        })),
        [count]
    );

    return (
        <div className="pointer-events-none absolute inset-0 z-40 overflow-hidden">
			{flies.map((fly) => (
				<span
					key={fly.id}
					className="absolute animate-drift rounded-full bg-pill-foreground"
					style={{
						left: fly.left,
						top: fly.top,
						width: fly.size,
						height: fly.size,
						animationDelay: fly.delay,
						animationDuration: fly.duration,
						boxShadow: "0 0 8px 2px rgba(240, 207, 122, 0.55)",
					}}
				/>
			))}
		</div>
    )
}