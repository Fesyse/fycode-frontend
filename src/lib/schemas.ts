/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { z } from "zod"
import { TestInputTypes } from "@/types/problem.type"

const MAX_FILE_SIZE = 1000 * 1000 * 4
const ACCEPTED_IMAGE_TYPES = [
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/webp"
]

const loginFormSchema = z.object({
	email: z.string().email(),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters long")
		.regex(/(.*[0-9]){3}.*/, "Password must have at least 3 digits")
})

const registerFormSchema = z.object({
	email: z.string().email(),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters long")
		.regex(/(.*[0-9]){3}.*/, "Password must have at least 3 digits"),
	username: z.string().min(4, "Username must be at least 4 characters long")
})

const updateUserFormSchema = z.object({
	email: z
		.union([z.string().length(0), z.string().email()])
		.optional()
		.transform(e => (e === "" ? undefined : e)),
	password: z
		.union([
			z.string().length(0),
			z.string().min(8, "Password must be at least 8 characters long"),
			z.string().regex(/(.*[0-9]){3}.*/, "Password must have at least 3 digits")
		])
		.optional()
		.transform(e => (e === "" ? undefined : e)),
	username: z
		.union([
			z.string().length(0),
			z.string().min(4, "Username must be at least 4 characters long")
		])
		.optional()
		.transform(e => (e === "" ? undefined : e))
})

const imageSchema = z.object({
	avatar: z
		.any()
		.refine(
			files => files?.[0]?.size <= MAX_FILE_SIZE,
			`Max image size is 4MB.`
		)
		.refine(
			files => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
			"Only .jpg, .jpeg, .png and .webp formats are supported."
		)
})

const createProblemSchema = z.object({
	useCustomTests: z.boolean(),
	totalChecks: z.number().optional(),
	functionArgs: z.array(
		z.object({
			name: z.string(),
			type: z.nativeEnum(TestInputTypes)
		})
	)
})

export {
	updateUserFormSchema,
	loginFormSchema,
	registerFormSchema,
	imageSchema,
	createProblemSchema
}
