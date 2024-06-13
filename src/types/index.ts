import type { ZodTypeAny, z } from "zod";

export type InferFlattenedErrors<SchemaType extends z.ZodTypeAny = ZodTypeAny> =
	z.inferFlattenedErrors<SchemaType, { message: string; errorCode: string }>;

export type Maybe<T> = T | undefined;
