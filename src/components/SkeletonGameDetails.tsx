import { SkeletonRow } from "~/components/SkeletonRow";

export function SkeletonGameDetails() {
	return (
		<div className="grid grid-cols-12 gap-4">
			<div className="col-span-12 flex flex-col gap-4 sm:col-span-4">
				<div className="relative aspect-square">
					<div className="h-full w-full bg-slate-300 object-cover" />
				</div>
				<div className="flex flex-col gap-2">
					<SkeletonRows />
				</div>
			</div>
			<div className="col-span-12 sm:col-span-8">
				<SkeletonRows />
			</div>
		</div>
	);
}

function SkeletonRows() {
	return (
		<div className="flex flex-col gap-1">
			{[...Array(4).map((_, i) => i)].map((i) => (
				<SkeletonRow key={i} />
			))}
		</div>
	);
}
