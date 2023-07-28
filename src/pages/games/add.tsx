import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { clsx } from "clsx";
import { useRouter } from "next/router";
import { useState, type Dispatch, type SetStateAction } from "react";
import { toast } from "react-hot-toast";

import { GameDetails } from "~/components";
import { api } from "~/lib/api";
import { type BGGGameResponse } from "~/server/api/routers/bgg";

const AddGamePage = () => {
	const [query, setQuery] = useState("");
	const { data: results, isFetching } = api.bgg.gamesByQuery.useQuery(query, {
		enabled: !!query,
	});

	return (
		<div className="container mx-auto">
			<QueryInput disabled={isFetching} setQuery={setQuery} />
			<QueryResults results={results} />
		</div>
	);
};

export default AddGamePage;

type QueryInputProps = {
	setQuery: Dispatch<SetStateAction<string>>;
	disabled: boolean;
};

const QueryInput = ({ setQuery, disabled }: QueryInputProps) => (
	<form
		className="flex flex-col gap-2 pb-4"
		onSubmit={(e) => {
			e.preventDefault();
			const q = new FormData(e.currentTarget).get("query");

			if (typeof q === "string") {
				setQuery(q);
			}
		}}
	>
		<input
			className="input input-bordered"
			defaultValue=""
			id="query"
			name="query"
			placeholder="Enter a boardgame name to search for"
			type="text"
		/>
		<button className="btn btn-secondary" disabled={disabled} type="submit">
			Search
		</button>
	</form>
);

type QueryResultsProps = {
	results?: Array<BGGGameResponse>;
};

const QueryResults = ({ results }: QueryResultsProps) => {
	if (!results) return null;

	return results.map((result) => (
		<QueryResult key={result.bggId} result={result} />
	));
};

type QueryResultProps = {
	result: BGGGameResponse;
};

const QueryResult = ({ result }: QueryResultProps) => {
	const router = useRouter();

	const { mutate: addGame, isLoading: disabled } = api.game.import.useMutation({
		onSuccess: () => {
			toast.success("Game added successfully!");
			void router.push("/games");
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	return (
		<Disclosure>
			{({ open }) => (
				<>
					<Disclosure.Button className="flex w-full justify-between border-b p-4 text-left font-medium hover:bg-slate-200 focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75">
						<p>
							{result.name} ({result.yearPublished})
						</p>
						<ChevronUpIcon
							className={clsx("h-5 w-5", {
								"rotate-180 transform": open,
							})}
						/>
					</Disclosure.Button>
					<Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
						<div className="pb-2">
							<button
								className="btn btn-secondary w-full"
								disabled={disabled}
								onClick={() => {
									addGame({
										bggId: result.bggId,
										imageSrc: result.imageSrc,
										thumbnailSrc: result.thumbnailSrc,
										description: result.description,
										yearPublished: result.yearPublished,
										minPlayers: result.minPlayers,
										maxPlayers: result.maxPlayers,
										playingTime: result.playingTime,
										minAge: result.minAge,
										rating: result.rating,
										numOfRatings: result.numOfRatings,
										name: result.name,
										authors: result.authors,
										categories: result.categories,
										mechanics: result.mechanics,
									});
								}}
							>
								Add This Game
							</button>
						</div>
						<GameDetails game={result} />
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
};
