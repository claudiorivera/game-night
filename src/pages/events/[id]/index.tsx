import { Dialog, Transition } from "@headlessui/react";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { User } from "@prisma/client";
import clsx from "clsx";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { toast } from "react-hot-toast";

import { GameDetails } from "~/components";
import { api } from "~/lib/api";

const EventDetailsPage = () => {
	const router = useRouter();
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const { data: user } = api.user.getCurrentUser.useQuery();

	const { data: event } = api.event.getById.useQuery(
		{
			id: router.query.id as string,
		},
		{
			enabled: !!router.query.id,
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

	if (!event || !user) return null;

	const { game } = event;

	// Delete confirm dialog
	const handleClose = () => {
		setIsDialogOpen(false);
	};

	const handleDelete = () => {
		deleteEventById({ id: event.id });
	};

	return (
		<div className="container mx-auto">
			<div className="pb-4">
				<Link href="/events" className="btn-ghost btn">
					<div className="flex items-center gap-2">
						<ArrowLeftIcon className="h-5 w-5" />
						Go Back
					</div>
				</Link>
			</div>
			<article className="rounded-lg border shadow-lg">
				<div className="p-4">
					<h4 className="font-bold">
						{dayjs(event.dateTime).format("MMMM D, YYYY [at] h:mma")}
					</h4>
					<small>{game.name}</small>
				</div>

				<div className="p-4">
					<GameDetails game={game} />
					<div className="divider" />
					<div>
						<p>Host:</p>
						<div className="tooltip" data-tip={event.host.name}>
							{event.host.image ? (
								<div className="avatar">
									<div className="relative h-10 w-10 rounded-full">
										<Image
											src={event.host.image}
											fill
											alt={event.host.name ?? ""}
											className="object-cover"
										/>
									</div>
								</div>
							) : (
								<div className="placeholder avatar">
									<div className="w-10 rounded-full">
										{event.host.name?.charAt(0)}
									</div>
								</div>
							)}
						</div>
					</div>
					<div>
						<p>Guests:</p>
						<div className="avatar-group -space-x-6">
							{event.guests.map((guest: Pick<User, "name" | "image">) => (
								<div
									key={guest.name}
									className="tooltip"
									data-tip={guest.name || "A Guest"}
								>
									{guest.image ? (
										<div className="avatar">
											<div className="relative h-10 w-10 rounded-full">
												<Image
													src={guest.image}
													fill
													alt={guest.name ?? ""}
													className="object-cover"
												/>
											</div>
										</div>
									) : (
										<div className="placeholder avatar">
											<div className="w-10 rounded-full">
												{guest.name?.charAt(0)}
											</div>
										</div>
									)}
								</div>
							))}
						</div>
					</div>
				</div>
				<div className="flex gap-4 p-4">
					{/* If user is already a guest, show the Leave button */}
					{event.guests.some((guest) => guest.id === user.id) ? (
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
					event.host.id !== user.id ? (
						<button
							className={clsx("btn-secondary btn", {
								"btn-disabled": disabled,
							})}
							disabled={disabled}
							onClick={() => {
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
								router.push(`/events/${router.query.id}/edit`);
							}}
						>
							Edit
						</button>
					)}
					{/* Show the Delete button to hosts and admins */}
					{(event.host.id === user.id || !!user.isAdmin) && (
						<button
							className="btn-error btn"
							onClick={async () => {
								setIsDialogOpen(true);
							}}
						>
							Delete
						</button>
					)}
				</div>
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
