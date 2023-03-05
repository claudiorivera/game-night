import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import moment from "moment";
import { PopulatedEvent } from "types";

import { Link } from "~/components";

type EventSummaryCardProps = {
  event: PopulatedEvent;
  isHosting?: boolean;
};
export const EventSummaryCard = ({
  event,
  isHosting,
}: EventSummaryCardProps) => {
  const { game, host } = event;

  return (
    <Link href={`/events/${event.id}`} sx={{ textDecoration: "none" }}>
      <Card>
        <CardHeader
          title={moment(event.dateTime).format("MMMM Do, YYYY [at] h:mma")}
          subheader={game.name}
          titleTypographyProps={{ variant: "subtitle2" }}
          subheaderTypographyProps={{ variant: "caption" }}
        />
        <CardMedia
          image={game.imageSrc}
          title={game.name}
          sx={{
            height: 0,
            paddingTop: "56.25%", // 16:9
          }}
        />
        <CardContent>
          {!isHosting && (
            <Typography variant="subtitle2" color="textSecondary">
              Host: {host.name}
            </Typography>
          )}
          <Typography variant="caption">
            Guests: {event.guests.length}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};
