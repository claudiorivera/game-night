import { type Event } from "@prisma/client";
import clsx from "clsx";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useState, type ComponentProps } from "react";

import {
	Avatar,
	BackButton,
	Dialog,
	GameDetails,
	SkeletonEvent,
} from "~/components";
import { useEventDetailsPage } from "~/hooks";
import { api } from "~/lib/api";

const EventDetailsPage = () => {
	const router = useRouter();
	const eventId = router.query.id as string;
	const [isDeleteEventDialogOpen, setIsDeleteEventDialogOpen] = useState(false);
	const { data: currentUserProfile } = api.profile.getMine.useQuery();
	const { event, isLoading, leaveEventById, joinEventById } =
		useEventDetailsPage(eventId);

	const isCurrentUserGuest =
		!!event &&
		event.guests.some((guest) => guest.id === currentUserProfile?.id);

	const isCurrentUserHost = !!event && event.host.id === currentUserProfile?.id;

	return (
		<>
			<BackButton />

			{!event ? (
				<SkeletonEvent />
			) : (
				<article className="rounded-lg border shadow-lg">
					<div className="p-4">
						<h4 className="font-bold">
							{dayjs(event.dateTime).format("MMMM D, YYYY [at] h:mma")}
						</h4>
						<small>{event.game.name}</small>
					</div>

					<div className="p-4">
						<GameDetails game={event.game} />

						<div className="divider" />

						<div>
							<p>Host:</p>
							{event.host.clerkId && <Avatar clerkId={event.host.clerkId} />}
						</div>

						<div>
							<p>Guests:</p>
							{!!event.guests.length ? (
								<div className="avatar-group -space-x-6">
									{event.guests.map((guest) => (
										<Avatar clerkId={guest.clerkId} key={guest.clerkId} />
									))}
								</div>
							) : (
								<small>None yet. Be the first!</small>
							)}
						</div>
					</div>

					<div className="flex gap-4 p-4">
						{isCurrentUserGuest ? (
							<Button
								disabled={isLoading}
								onClick={() => {
									leaveEventById({ id: event.id });
								}}
							>
								Leave
							</Button>
						) : isCurrentUserHost ? (
							<Button
								disabled={isLoading}
								onClick={() => {
									void router.push(`/events/${eventId}/edit`);
								}}
							>
								Edit
							</Button>
						) : (
							<Button
								disabled={isLoading}
								onClick={() => {
									if (!event?.id) return;

									joinEventById({ id: event.id });
								}}
							>
								Join
							</Button>
						)}

						{(isCurrentUserHost || currentUserProfile?.isAdmin) && (
							<button
								className="btn-error btn"
								onClick={() => setIsDeleteEventDialogOpen(true)}
							>
								Delete
							</button>
						)}
					</div>
				</article>
			)}

			<EventDeleteDialog
				eventId={eventId}
				isOpen={isDeleteEventDialogOpen}
				onClose={() => setIsDeleteEventDialogOpen(false)}
			/>
		</>
	);
};

export default EventDetailsPage;

const Button = ({
	disabled = false,
	children,
	...buttonProps
}: ComponentProps<"button">) => (
	<button
		className={clsx("btn-secondary btn", {
			"btn-disabled": disabled,
		})}
		disabled={disabled}
		{...buttonProps}
	>
		{children}
	</button>
);

type EventDeleteDialogProps = {
	isOpen: boolean;
	onClose: () => void;
	eventId: Event["id"];
};

const EventDeleteDialog = ({
	isOpen,
	onClose,
	eventId,
}: EventDeleteDialogProps) => {
	const { handleDelete } = useEventDetailsPage(eventId);

	return (
		<Dialog isOpen={isOpen} onClose={onClose} title={"Delete Event"}>
			<p className="text-sm text-gray-500">
				Are you sure you want to delete this event?
			</p>

			<div className="flex justify-between">
				<button className="btn" onClick={onClose} type="button">
					Cancel
				</button>
				<button className="btn-error btn" onClick={handleDelete} type="button">
					Yes
				</button>
			</div>
		</Dialog>
	);
};
