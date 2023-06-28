export const SkeletonCard = () => (
	<article className="rounded-lg border shadow-lg">
		<div className="animate-pulse">
			<div className="flex flex-col gap-3 p-4">
				<div className="h-4 w-4/5 rounded-xl bg-slate-500" />
				<div className="h-2 w-3/5 rounded bg-slate-300" />
			</div>
			<div className="relative aspect-video">
				<div className="h-full w-full bg-slate-300 object-cover" />
			</div>
			<div className="p-4">
				<div className="flex flex-col gap-3">
					<div className="h-4 w-2/5 rounded-xl bg-slate-500" />
					<div className="h-2 w-1/5 rounded bg-slate-300" />
				</div>
			</div>
		</div>
	</article>
);
