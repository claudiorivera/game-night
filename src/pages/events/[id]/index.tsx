import { type Event } from "@prisma/client";
import { clsx } from "clsx";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { type ComponentProps, useState } from "react";
import { Avatar } from "~/components/avatar";
import { BackButton } from "~/components/back-button";
import { Dialog } from "~/components/dialog";
import { GameDetails } from "~/components/game-details";
import { SkeletonEvent } from "~/components/skeleton-event";
import { useEventDetailsPage } from "~/hooks/use-event-details";
import { api } from "~/lib/api";

export default function EventDetailsPage() {
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
							<Avatar profile={event.host} />
						</div>

						<div>
							<p>Guests:</p>
							{event.guests.length ? (
								<div className="avatar-group -space-x-6">
									{event.guests.map((guest) => (
										<Avatar key={guest.clerkId} profile={guest} />
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
								type="button"
								className="btn btn-error"
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
}

function Button({
	disabled = false,
	children,
	...buttonProps
}: ComponentProps<"button">) {
	return (
		<button
			type="button"
			className={clsx("btn btn-secondary", {
				"btn-disabled": disabled,
			})}
			disabled={disabled}
			{...buttonProps}
		>
			{children}
		</button>
	);
}

function EventDeleteDialog({
	isOpen,
	onClose,
	eventId,
}: {
	isOpen: boolean;
	onClose: () => void;
	eventId: Event["id"];
}) {
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
				<button className="btn btn-error" onClick={handleDelete} type="button">
					Yes
				</button>
			</div>
		</Dialog>
	);
}
