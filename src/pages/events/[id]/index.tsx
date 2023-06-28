import { Dialog, Transition } from "@headlessui/react";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { toast } from "react-hot-toast";

import { Avatar, GameDetails } from "~/components";
import { api } from "~/lib/api";

const EventDetailsPage = () => {
	const router = useRouter();
	const eventId = router.query.id as string;

	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const { data: currentUserProfile } = api.profile.getMine.useQuery();

	const { data: event } = api.event.getById.useQuery(
		{
			id: eventId,
		},
		{
			enabled: !!eventId,
		},
	);

	const { mutate: deleteEventById, isLoading: isDeletingEvent } =
		api.event.deleteById.useMutation({
			onSuccess: () => {
				toast.success("Event deleted!");
				router.back();
			},
			onError: (error) => {
				toast.error(error.message);
			},
		});

	const { mutate: leaveEventById, isLoading: isLeavingEvent } =
		api.event.leaveById.useMutation({
			onSuccess: () => {
				toast.success("You have left the event!");
				router.back();
			},
			onError: (error) => {
				toast.error(error.message);
			},
		});

	const { mutate: joinEventById, isLoading: isJoiningEvent } =
		api.event.joinById.useMutation({
			onSuccess: () => {
				toast.success("You have joined the event!");
				router.back();
			},
			onError: (error) => {
				toast.error(error.message);
			},
		});

	const disabled = isDeletingEvent || isLeavingEvent || isJoiningEvent;

	const handleClose = () => {
		setIsDialogOpen(false);
	};

	const handleDelete = () => {
		if (!event) return;

		deleteEventById({ id: event.id });
	};

	return (
		<div className="container mx-auto">
			<div className="pb-4">
				<button onClick={() => router.back()} className="btn-ghost btn">
					<div className="flex items-center gap-2">
						<ArrowLeftIcon className="h-5 w-5" />
						Go Back
					</div>
				</button>
			</div>
			<article className="rounded-lg border shadow-lg">
				<div className="p-4">
					<h4 className="font-bold">
						{event?.dateTime ? (
							dayjs(event.dateTime).format("MMMM D, YYYY [at] h:mma")
						) : (
							<SkeletonRow />
						)}
					</h4>
					<small>{event?.game.name ? event.game.name : <SkeletonRow />}</small>
				</div>

				<div className="p-4">
					<GameDetails game={event?.game} />
					<div className="divider" />
					<div>
						<p>Host:</p>
						{!!event?.host.clerkId ? (
							<Avatar clerkId={event.host.clerkId} />
						) : (
							<SkeletonRow />
						)}
					</div>
					<div>
						<p>Guests:</p>
						{!!event?.guests ? (
							<div className="avatar-group -space-x-6">
								{event.guests.map((guest) => (
									<Avatar clerkId={guest.clerkId} key={guest.id} />
								))}
							</div>
						) : (
							<SkeletonRow />
						)}
					</div>
				</div>
				{!!event && (
					<div className="flex gap-4 p-4">
						{/* If user is already a guest, show the Leave button */}
						{event.guests.some(
							(guest) => guest.id === currentUserProfile?.id,
						) ? (
							<button
								className={clsx("btn-secondary btn", {
									"btn-disabled": disabled,
								})}
								disabled={disabled}
								onClick={() => {
									leaveEventById({ id: event.id });
								}}
							>
								Leave
							</button>
						) : // Otherwise, as long as user isn't the host, show the Join loadingbutton
						event.host.id !== currentUserProfile?.id ? (
							<button
								className={clsx("btn-secondary btn", {
									"btn-disabled": disabled,
								})}
								disabled={disabled}
								onClick={() => {
									if (!event.id) return;

									joinEventById({ id: event.id });
								}}
							>
								Join
							</button>
						) : (
							// Otherwise, we're the host, so show the Edit button
							<button
								className={clsx("btn-secondary btn", {
									"btn-disabled": disabled,
								})}
								onClick={() => {
									void router.push(`/events/${eventId}/edit`);
								}}
							>
								Edit
							</button>
						)}
						{/* Show the Delete button to hosts and admins */}
						{(event.host.id === currentUserProfile?.id ||
							currentUserProfile?.isAdmin) && (
							<button
								className="btn-error btn"
								onClick={() => {
									setIsDialogOpen(true);
								}}
							>
								Delete
							</button>
						)}
					</div>
				)}
			</article>
			<Transition appear show={isDialogOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={handleClose}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="flex w-full max-w-md transform flex-col gap-2 overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6 text-gray-900"
									>
										Delete Event
									</Dialog.Title>
									<p className="text-sm text-gray-500">
										Are you sure you want to delete this event?
									</p>

									<div className="flex justify-between">
										<button type="button" className="btn" onClick={handleClose}>
											Cancel
										</button>
										<button
											type="button"
											className="btn-error btn"
											onClick={handleDelete}
										>
											Yes
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</div>
	);
};

export default EventDetailsPage;

const SkeletonRow = () => (
	<div className="my-2 h-4 animate-pulse rounded-md bg-gray-300" />
);
