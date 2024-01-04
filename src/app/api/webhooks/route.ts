import { type WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Webhook } from "svix";
import { z } from "zod";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";

const clerkUserSchema = z.object({
	id: z.string(),
	image_url: z.string().url().nullish(),
	username: z.string().nullish(),
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

	const { id, username, image_url } = validation.data;

	const eventType = evt.type;

	if (eventType === "user.created") {
		const profile = await prisma.profile.create({
			data: {
				clerkId: id,
				avatarUrl: image_url,
			},
		});

		return Response.json(profile);
	}

	if (eventType === "user.updated") {
		const profile = await prisma.profile.upsert({
			where: {
				clerkId: id,
			},
			update: {
				clerkId: id,
				avatarUrl: image_url,
				username,
			},
			create: {
				clerkId: id,
				avatarUrl: image_url,
				username,
			},
		});

		return Response.json(profile);
	}

	if (eventType === "user.deleted") {
		const profile = await prisma.profile.delete({
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
