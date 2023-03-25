import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { PopulatedEvent } from "types";

type EventSummaryCardProps = {
  event: PopulatedEvent;
  isHosting?: boolean;
};

type CardProps = {
  children: ReactNode;
};

const Card = ({ children }: CardProps) => {
  return <article className="rounded-lg border shadow-lg">{children}</article>;
};

type CardHeaderProps = {
  title: string;
  subheader: string;
};

const CardHeader = ({ title, subheader }: CardHeaderProps) => {
  return (
    <div className="p-4">
      <h4 className="font-bold">{title}</h4>
      <small>{subheader}</small>
    </div>
  );
};

type CardMediaProps = {
  image: string;
  title: string;
};

const CardMedia = ({ image, title }: CardMediaProps) => {
  return (
    <div className="relative aspect-video">
      <Image className="object-cover" fill src={image} alt={title} />
    </div>
  );
};

type CardContentProps = {
  children: ReactNode;
};

const CardContent = ({ children }: CardContentProps) => {
  return <div className="p-4">{children}</div>;
};

export const EventSummaryCard = ({
  event,
  isHosting,
}: EventSummaryCardProps) => {
  const { game, host } = event;

  return (
    <Link href={`/events/${event.id}`}>
      <Card>
        <CardHeader
          title={moment(event.dateTime).format("MMMM Do, YYYY [at] h:mma")}
          subheader={game.name}
        />
        <CardMedia image={game.imageSrc} title={game.name} />
        <CardContent>
          <div className="flex flex-col">
            {!isHosting && (
              <small className="font-semibold">Host: {host.name}</small>
            )}
            <small>Guests: {event.guests.length}</small>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
