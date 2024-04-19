"use client";

import { Input } from "~/components/input";
import { SubmitButton } from "~/components/submit-button";

export function SearchGamesForm({ query }: { query?: string }) {
	return (
		<form className="flex flex-col gap-4">
			<Input
				type="search"
				defaultValue={query}
				name="query"
				placeholder="Enter a boardgame name to search for"
			/>

			<SubmitButton>Search</SubmitButton>
		</form>
	);
}
