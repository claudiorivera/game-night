import { Game } from "@prisma/client";
import axios from "axios";
import clsx from "clsx";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "pages/api/auth/[...nextauth]";
import { useState } from "react";
import { toast } from "react-hot-toast";

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

type AddEventPageProps = {
  games: Game[];
};
const AddEventPage = ({ games }: AddEventPageProps) => {
  const router = useRouter();
  const [dateTime, setDateTime] = useState<Date | null>(new Date());
  const [gameId, setGameId] = useState("");
  const [disabled, setDisabled] = useState(false);

  const addEvent = async (gameId: string, dateTime: Date | null) => {
    try {
      await axios.post("/api/events", {
        gameId,
        dateTime,
      });
    } catch (error) {
      toast.error(JSON.stringify(error, null, 2));
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setDisabled(true);
        await addEvent(gameId, dateTime);
        router.push("/events");
      }}
      className="flex flex-col gap-4"
    >
      <label className="text-sm">
        Event Date and Time
        <input
          className="input-bordered input w-full"
          type="datetime-local"
          defaultValue={new Date().toISOString().slice(0, 16)}
          pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
          onChange={(e) => setDateTime(new Date(e.target.value))}
        />
        <input
          type="hidden"
          name="utcOffset"
          value={new Date().getTimezoneOffset()}
        />
      </label>
      <select
        className="select-bordered select w-full"
        id="select-game"
        defaultValue={-1}
        onChange={(e) => {
          setGameId(e.target.value as string);
        }}
      >
        <option disabled value={-1}>
          Select Game
        </option>
        {games.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
      <button
        className={clsx("btn-secondary btn w-full", {
          "btn-disabled": disabled,
        })}
        type="submit"
        disabled={disabled}
      >
        Add Event
      </button>
    </form>
  );
};

export default AddEventPage;
