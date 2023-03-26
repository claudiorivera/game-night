import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { GameDetails } from "~/components";
import { api } from "~/lib/api";
import { BGGGameResponse } from "~/lib/fetchBggGameById";
import { fetchBggGamesByQuery } from "~/lib/fetchBggGamesByQuery";
import { authOptions } from "~/server/auth";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	const session = await getServerSession(req, res, authOptions);

	if (!session) {
		return {
			redirect: {
				destination: "/api/auth/signin",
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};

const AddGamePage = () => {
	const router = useRouter();
	const [query, setQuery] = useState("");
	const [queryResults, setQueryResults] = useState<Array<BGGGameResponse>>([]);
	const [isFetching, setIsFetching] = useState(false);

	const { mutate: addGame, isLoading: disabled } = api.game.import.useMutation({
		onSuccess: () => {
			toast.success("Game added successfully!");
			router.push("/games");
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const handleSearch = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		setIsFetching(true);
		const results = await fetchBggGamesByQuery(query);
		setQueryResults(results);
		setIsFetching(false);
	};

	const handleQueryChange: React.ChangeEventHandler<HTMLInputElement> = async (
		e,
	) => {
		setQuery(e.target.value);
	};

	return (
		<>
			<div className="container mx-auto">
				<form onSubmit={handleSearch} className="flex flex-col gap-2 pb-4">
					<input
						name="query"
						id="query"
						type="text"
						placeholder="Enter a boardgame name to search for"
						className="input-bordered input"
						value={query}
						onChange={handleQueryChange}
					/>
					<button
						className="btn-secondary btn"
						type="submit"
						disabled={isFetching}
					>
						Search
					</button>
				</form>
			</div>

			{queryResults
				.filter((result): result is NonNullable<BGGGameResponse> => !!result)
				.map((result) => (
					<Disclosure key={result.bggId}>
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
								<Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
									<div className="pb-2">
										<button
											className="btn-secondary btn w-full"
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
				))}
		</>
	);
};

export default AddGamePage;
