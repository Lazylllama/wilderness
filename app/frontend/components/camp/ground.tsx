export function Ground() {
	return (
		<>
			<div
				className="pointer-events-none absolute left-1/2 top-[26%] -z-10 h-[92%] w-[128%] -translate-x-1/2 rounded-[50%]"
				style={{
					background:
						"radial-gradient(ellipse at 50% 42%, #3f5230 0%, #33452a 40%, #24301c 72%, transparent 100%)",
				}}
			/>
			<div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-linear-to-t from-background to-transparent" />
		</>
	);
}
