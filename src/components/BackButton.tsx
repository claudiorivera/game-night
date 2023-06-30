import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";

export const BackButton = () => {
	const router = useRouter();

	return (
		<div className="pb-4">
			<button className="btn-ghost btn" onClick={() => router.back()}>
				<div className="flex items-center gap-2">
					<ArrowLeftIcon className="h-5 w-5" />
					Go Back
				</div>
			</button>
		</div>
	);
};
