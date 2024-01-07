import { headers } from "next/headers";
import { Webhook } from "svix";
import { z } from "zod";
import { env } from "~/env.mjs";
import { db } from "~/server/db";

const clerkWebhookUserEvent = z.object({
	data: z.object({
		id: z.string(),
		image_url: z.string().url().nullish(),
		username: z.string().nullish(),
		first_name: z.string().nullish(),
		last_name: z.string().nullish(),
	}),
	object: z.literal("event"),
	type: z.enum(["user.created", "user.updated", "user.deleted"]),
});

export async function POST(req: Request) {
	const headerPayload = headers();
	const svixId = headerPayload.get("svix-id");
	const svixTimestamp = headerPayload.get("svix-timestamp");
	const svixSignature = headerPayload.get("svix-signature");

	if (!svixId || !svixTimestamp || !svixSignature) {
		return Response.json(
			{ message: "Error occured -- no svix headers" },
			{
				status: 400,
			},
		);
	}

	const requestBody = (await req.json()) as unknown;

	const webhookEvent = new Webhook(env.WEBHOOK_SECRET).verify(
		JSON.stringify(requestBody),
		{
			"svix-id": svixId,
			"svix-timestamp": svixTimestamp,
			"svix-signature": svixSignature,
		},
	);

	const validation = clerkWebhookUserEvent.safeParse(webhookEvent);

	if (!validation.success) {
		return Response.json(
			{ message: validation.error },
			{
				status: 400,
			},
		);
	}

	const {
		data: { id, username, image_url, first_name, last_name },
		type,
	} = validation.data;

	switch (type) {
		case "user.created":
			await db.profile.create({
				data: {
					clerkId: id,
					avatarUrl: image_url,
					username,
					firstName: first_name,
					lastName: last_name,
				},
			});

			return Response.json(null, { status: 201 });
		case "user.updated":
			await db.profile.upsert({
				where: {
					clerkId: id,
				},
				update: {
					clerkId: id,
					avatarUrl: image_url,
					username,
					firstName: first_name,
					lastName: last_name,
				},
				create: {
					clerkId: id,
					avatarUrl: image_url,
					username,
					firstName: first_name,
					lastName: last_name,
				},
			});

			return Response.json(null, {
				status: 204,
			});
		case "user.deleted":
			await db.profile.delete({
				where: {
					clerkId: id,
				},
			});

			return Response.json(null, {
				status: 204,
			});
	}
}
