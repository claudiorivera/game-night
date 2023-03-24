import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { PopulatedEvent } from "types";

import { TypographyH4, TypographySmall, TypographyTiny } from "~/components";

type EventSummaryCardProps = {
  event: PopulatedEvent;
  isHosting?: boolean;
};

type CardProps = {
  children: ReactNode;
};

const Card = ({ children }: CardProps) => {
  return <div className="rounded-lg border shadow-lg">{children}</div>;
};

type CardHeaderProps = {
  title: string;
  subheader: string;
};

const CardHeader = ({ title, subheader }: CardHeaderProps) => {
  return (
    <div className="px-4 py-2">
      <TypographyH4>{title}</TypographyH4>
      <TypographyTiny>{subheader}</TypographyTiny>
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
  return <div className="px-4 py-2">{children}</div>;
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
          {!isHosting && <TypographySmall>Host: {host.name}</TypographySmall>}
          <TypographyTiny>Guests: {event.guests.length}</TypographyTiny>
        </CardContent>
      </Card>
    </Link>
  );
};
