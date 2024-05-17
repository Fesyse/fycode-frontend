"use client"

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/shadcn/form"
import { useForm } from "react-hook-form"
import { Input } from "@/components/shadcn/input"
import { Button } from "@/components/shadcn/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { z } from "zod"
import { useRef, type FC } from "react"
import { type FormsProps } from "."
import { useTabResize } from "@/hooks/useTabResize"
import { useRegister } from "@/hooks/auth/useRegister"
import { useRouter } from "next/navigation"

const registerFormSchema = z.object({
	email: z.string().email(),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters long")
		.regex(/(.*[0-9]){3}.*/, "Password must have at least 3 digits"),
	username: z.string().min(4, "Username must be at least 4 characters long")
})

export const Register: FC<FormsProps> = ({
	setCurrentTab,
	tabSizes,
	setTabSizes,
	callbackUrl
}) => {
	const form = useForm<z.infer<typeof registerFormSchema>>({
		mode: "onChange",
		resolver: zodResolver(registerFormSchema),
		defaultValues: {
			username: "",
			email: "",
			password: ""
		}
	})
	const { register } = useRegister()
	const router = useRouter()

	const registerFormRef = useRef<HTMLFormElement | null>(null)
	const onSubmit = (formFields: z.infer<typeof registerFormSchema>) =>
		register(formFields, { onSuccess: () => router.push(callbackUrl) })

	useTabResize({
		errors: form.formState.errors,
		offsetHeight: registerFormRef.current?.clientHeight ?? 0,
		setTabSizes,
		type: "register"
	})
	return (
		<motion.div
			key="register"
			transition={{
				duration: 0.25
			}}
			initial={{
				height: tabSizes.login,
				opacity: 0,
				filter: "blur(4px)"
			}}
			animate={{
				height: tabSizes.register,
				opacity: 1,
				filter: "blur(0px)"
			}}
			exit={{
				height: tabSizes.login,
				opacity: 0,
				filter: "blur(4px)"
			}}
		>
			<Form {...form}>
				<form
					ref={registerFormRef}
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col space-y-4"
				>
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input
										{...field}
										type="text"
										placeholder="Your username..."
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input {...field} type="email" placeholder="Your email..." />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										{...field}
										type="password"
										placeholder="Your password..."
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<p>
						Already have an account?{" "}
						<button
							type="button"
							onClick={() => setCurrentTab("login")}
							className="underline"
						>
							Login
						</button>
					</p>
					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</motion.div>
	)
}
