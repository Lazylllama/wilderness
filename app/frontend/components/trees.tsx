const treeModules = import.meta.glob<string>("/assets/trees/*.svg", {
	eager: true,
	import: "default",
});

const treeUrls = Object.keys(treeModules)
	.sort()
	.map((key) => treeModules[key]);

function pseudoRandom(seed: number) {
	const x = Math.sin(seed * 12.9898) * 43758.5453;
	return x - Math.floor(x);
}

export function Trees({ count = 30 }: { count?: number }) {
	return (
		<div className="absolute inset-x-0 bottom-0 -z-10 overflow-hidden pointer-events-none flex items-end bg-linear-to-t from-background to-transparent">
			{Array.from({ length: count }).map((_, index) => (
				<img
					key={`tree-${
						// biome-ignore lint/suspicious/noArrayIndexKey: no
						index
					}`}
					src={treeUrls[index % treeUrls.length]}
					alt=""
					style={{
						marginLeft: index === 0 ? 0 : pseudoRandom(index) < 0.3 ? -64 : 4, // ts barely* even works, the tree boundaries are hella cooked
					}}
					className="w-auto shrink-0 first:ml-0"
				/>
			))}
		</div>
	);
}
