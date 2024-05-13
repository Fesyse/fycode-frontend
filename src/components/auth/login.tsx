"use client"

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/shadcn/form"
import { Input } from "@/components/shadcn/input"
import { Button } from "@/components/shadcn/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { z } from "zod"
import { useRef, type FC } from "react"
import { type FormsProps } from "."
import { useTabResize } from "@/hooks/useTabResize"

export const loginFormSchema = z.object({
	email: z.string().email(),
	password: z
		.string()
		.regex(/.*[0-9].*/)
		.min(8)
})

export const Login: FC<FormsProps> = ({
	setCurrentTab,
	tabSizes,
	setTabSizes
}) => {
	const form = useForm<z.infer<typeof loginFormSchema>>({
		resolver: zodResolver(loginFormSchema),
		mode: "onSubmit",
		defaultValues: {
			email: "",
			password: ""
		}
	})

	const loginFormRef = useRef<HTMLFormElement | null>(null)
	const onSubmit = () => console.log

	useTabResize({
		errors: form.formState.errors,
		offsetHeight: loginFormRef.current?.clientHeight ?? 0,
		setTabSizes,
		type: "login"
	})
	return (
		<motion.div
			key="login"
			transition={{
				duration: 0.25
			}}
			initial={{
				height: tabSizes.register,
				opacity: 0,
				filter: "blur(4px)"
			}}
			animate={{
				height: tabSizes.login,
				opacity: 1,
				filter: "blur(0px)"
			}}
			exit={{
				height: tabSizes.register,
				opacity: 0,
				filter: "blur(4px)"
			}}
		>
			<Form {...form}>
				<form
					ref={loginFormRef}
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col space-y-4"
				>
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
						Dont have an account yet?{" "}
						<button
							onClick={() => setCurrentTab("register")}
							className="underline"
						>
							Register
						</button>
					</p>
					<Button>Submit</Button>
				</form>
			</Form>
		</motion.div>
	)
}
