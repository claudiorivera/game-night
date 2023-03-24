import { EventSummaryCard } from "components";
import { PopulatedEvent } from "types";

type EventsListContainerProps = {
  events: PopulatedEvent[];
  isHosting?: boolean;
  [props: string]: any;
};

export const EventsListContainer = ({
  events,
  isHosting,
  ...props
}: EventsListContainerProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2" {...props}>
      {events.map((event) => (
        <div key={event.id}>
          <EventSummaryCard event={event} isHosting={isHosting} />
        </div>
      ))}
    </div>
  );
};
