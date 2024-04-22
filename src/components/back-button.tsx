"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";

export function BackButton() {
	const router = useRouter();

	return (
		<Button type="button" variant="secondary" onClick={() => router.back()}>
			<div className="flex items-center gap-2">
				<ArrowLeft className="h-4 w-4" />
				<p>Go Back</p>
			</div>
		</Button>
	);
}
