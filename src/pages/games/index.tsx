import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth";

import { GameDetails } from "~/components";
import { api } from "~/lib/api";
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

const GamesListPage = () => {
	const { data: games, isLoading: disabled } = api.game.getAll.useQuery();

	return (
		<div className="min-h-screen">
			<div className="pb-4">
				<Link
					className={clsx("btn-secondary btn w-full", {
						"btn-disabled": disabled,
					})}
					href="/games/add"
				>
					Add Game
				</Link>
			</div>
			{!!games && (
				<div className="pb-4">
					{games.map((game) => (
						<Disclosure key={game.id}>
							{({ open }) => (
								<>
									<Disclosure.Button className="flex w-full justify-between border-b p-4 text-left font-medium hover:bg-slate-300 focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75">
										<h6>
											{game.name} ({game.yearPublished})
										</h6>
										<ChevronUpIcon
											className={clsx("h-5 w-5", {
												"rotate-180 transform": open,
											})}
										/>
									</Disclosure.Button>
									<Disclosure.Panel className="p-4 text-sm text-gray-500">
										<GameDetails game={game} />
									</Disclosure.Panel>
								</>
							)}
						</Disclosure>
					))}
				</div>
			)}
		</div>
	);
};

export default GamesListPage;
