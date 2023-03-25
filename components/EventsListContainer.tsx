import { EventSummaryCard } from "components";
import { PopulatedEvent } from "types";

type EventsListContainerProps = {
  events: PopulatedEvent[];
  isHosting?: boolean;
};

export const EventsListContainer = ({
  events,
  isHosting,
}: EventsListContainerProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <div key={event.id}>
          <EventSummaryCard event={event} isHosting={isHosting} />
        </div>
      ))}
    </div>
  );
};
