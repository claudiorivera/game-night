import { type Event } from "@prisma/client";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

import { api } from "~/lib/api";

export const useEventDetailsPage = (eventId: Event["id"]) => {
	const router = useRouter();

	const handleSuccessWithMessage = (message: string) => {
		toast.success(message);
		router.back();
	};

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
			onSuccess: () => handleSuccessWithMessage("Event deleted!"),
			onError: (error) => toast.error(error.message),
		});

	const { mutate: leaveEventById, isLoading: isLeavingEvent } =
		api.event.leaveById.useMutation({
			onSuccess: () => handleSuccessWithMessage("You have left the event!"),
			onError: (error) => toast.error(error.message),
		});

	const { mutate: joinEventById, isLoading: isJoiningEvent } =
		api.event.joinById.useMutation({
			onSuccess: () => handleSuccessWithMessage("You have joined the event!"),
			onError: (error) => toast.error(error.message),
		});

	const isLoading = isDeletingEvent || isLeavingEvent || isJoiningEvent;

	const handleDelete = () => {
		if (!event) return;

		deleteEventById({ id: event.id });
	};

	return {
		event,
		isLoading,
		handleDelete,
		joinEventById,
		leaveEventById,
	};
};
