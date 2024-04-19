"use client";

import { useEffect } from "react";

export default function ImportError({
	error,
}: {
	error: Error & { digest?: string };
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div>
			<h2>Something broke 😿</h2>
		</div>
	);
}
