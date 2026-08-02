const treeModules = import.meta.glob<string>("/assets/trees/*.svg", {
	eager: true,
	import: "default",
});

const treeUrls = Object.keys(treeModules)
	.sort()
	.map((key) => treeModules[key]);

// Deterministic pseudo-random in [0, 1), seeded by index, so heights vary but stay stable across renders.
function pseudoRandom(seed: number) {
	const x = Math.sin(seed * 12.9898) * 43758.5453;
	return x - Math.floor(x);
}

const MIN_HEIGHT = 90;
const MAX_HEIGHT = 180;

export function Trees({ count = 60 }: { count?: number }) {
	return (
		<div className="absolute inset-x-0 bottom-24 -z-10 overflow-hidden pointer-events-none flex items-end">
			{Array.from({ length: count }).map((_, index) => (
				<img
					key={`tree-${index}`}
					src={treeUrls[index % treeUrls.length]}
					alt=""
					style={{
						height: `${MIN_HEIGHT + pseudoRandom(index) * (MAX_HEIGHT - MIN_HEIGHT)}px`,
					}}
					className="w-auto shrink-0 -ml-12 first:ml-0"
				/>
			))}
		</div>
	);
}
