import { SkeletonGameDetails } from "~/components/skeleton-game-details";
import { SkeletonRow } from "~/components/skeleton-row";

export function SkeletonEvent() {
	return (
		<article className="rounded-lg border shadow-lg">
			<div className="p-4">
				<h4 className="font-bold">
					<SkeletonRow />
				</h4>
				<small>
					<SkeletonRow />
				</small>
			</div>

			<div className="p-4">
				<SkeletonGameDetails />

				<div className="divider" />

				<div>
					<p>Host:</p>
					<SkeletonRow />
				</div>

				<div>
					<p>Guests:</p>
					<SkeletonRow />
				</div>
			</div>
		</article>
	);
}
