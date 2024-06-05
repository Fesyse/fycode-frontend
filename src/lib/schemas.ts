import { z } from "zod"

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

export { updateUserFormSchema, loginFormSchema, registerFormSchema }
