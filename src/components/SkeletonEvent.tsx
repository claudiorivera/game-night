import { GameDetails } from "~/components/GameDetails";
import { SkeletonRow } from "~/components/SkeletonRow";

export const SkeletonEvent = () => (
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
			<GameDetails />

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
