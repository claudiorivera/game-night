"use client";

import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

export function BackButton() {
	const router = useRouter();

	return (
		<button
			type="button"
			className="btn btn-secondary"
			onClick={() => router.back()}
		>
			<div className="flex items-center gap-2">
				<ArrowLeftIcon className="h-5 w-5" />
				<span>Go Back</span>
			</div>
		</button>
	);
}
