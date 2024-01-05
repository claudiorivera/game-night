import { type WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Webhook } from "svix";
import { z } from "zod";
import { env } from "~/env.mjs";
import { db } from "~/server/db";

const clerkUserSchema = z.object({
	id: z.string(),
	image_url: z.string().url().nullish(),
	username: z.string().nullish(),
	first_name: z.string().nullish(),
	last_name: z.string().nullish(),
});

export async function POST(req: Request) {
	const headerPayload = headers();
	const svixId = headerPayload.get("svix-id");
	const svixTimestamp = headerPayload.get("svix-timestamp");
	const svixSignature = headerPayload.get("svix-signature");

	// If there are no headers, error out
	if (!svixId || !svixTimestamp || !svixSignature) {
		return Response.json(
			{ message: "Error occured -- no svix headers" },
			{
				status: 400,
			},
		);
	}

	const payload = (await req.json()) as unknown;

	const body = JSON.stringify(payload);

	const wh = new Webhook(env.WEBHOOK_SECRET);

	let evt: WebhookEvent;

	try {
		evt = wh.verify(body, {
			"svix-id": svixId,
			"svix-timestamp": svixTimestamp,
			"svix-signature": svixSignature,
		}) as WebhookEvent;
	} catch (err) {
		console.error("Error verifying webhook:", err);
		return Response.json(
			{ message: "Error occured" },
			{
				status: 400,
			},
		);
	}

	const validation = clerkUserSchema.safeParse(evt.data);

	if (!validation.success) {
		console.error("Error validating webhook:", validation.error);
		return Response.json(
			{ message: "Error occured" },
			{
				status: 400,
			},
		);
	}

	const { id, username, image_url, first_name, last_name } = validation.data;

	const eventType = evt.type;

	if (eventType === "user.created") {
		const profile = await db.profile.create({
			data: {
				clerkId: id,
				avatarUrl: image_url,
				username,
				firstName: first_name,
				lastName: last_name,
			},
		});

		return Response.json(profile);
	}

	if (eventType === "user.updated") {
		const profile = await db.profile.upsert({
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

		return Response.json(profile);
	}

	if (eventType === "user.deleted") {
		const profile = await db.profile.delete({
			where: {
				clerkId: id,
			},
		});

		return Response.json(profile);
	}

	return Response.json(
		{ message: "Error occured -- no webhook event" },
		{
			status: 400,
		},
	);
}
