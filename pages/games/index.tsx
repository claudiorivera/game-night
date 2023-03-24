import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { Game } from "@prisma/client";
import clsx from "clsx";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "pages/api/auth/[...nextauth]";
import { useState } from "react";

import { GameDetails } from "~/components";

import prisma from "../../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, nextAuthOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  const games = await prisma.game.findMany();

  if (!games) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { games: JSON.parse(JSON.stringify(games)) },
  };
};

type GamesListPageProps = {
  games: Game[];
};

const GamesListPage = ({ games }: GamesListPageProps) => {
  const [disabled, setDisabled] = useState(false);

  return (
    <div className="min-h-screen">
      <div className="pb-4">
        <Link
          onClick={() => setDisabled(true)}
          href="/games/add"
          className={clsx("btn-secondary btn w-full", {
            "cursor-not-allowed opacity-50": disabled,
          })}
        >
          Add Game
        </Link>
      </div>

      {games.map((game) => (
        <Disclosure key={game.id}>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between border-b p-4 text-left font-medium hover:bg-slate-200 focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75">
                <h6>
                  {game.name} ({game.yearPublished})
                </h6>
                <ChevronUpIcon
                  className={clsx("h-5 w-5", {
                    "rotate-180 transform": open,
                  })}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                <GameDetails game={game} />
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </div>
  );
};

export default GamesListPage;
