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
import { motion, type MotionProps } from "framer-motion"
import { z } from "zod"
import { useRef, type FC } from "react"
import { type FormsProps } from "."
import { useTabResize } from "@/hooks/useTabResize"
import { useLogin } from "@/hooks/auth/useLogin"
import { useRouter } from "next/navigation"

const loginFormSchema = z.object({
	email: z.string().email(),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters long")
		.regex(/(.*[0-9]){3}.*/, "Password must have at least 3 digits")
})

export const Login: FC<FormsProps> = ({
	setCurrentTab,
	tabSizes,
	setTabSizes,
	callbackUrl
}) => {
	const form = useForm<z.infer<typeof loginFormSchema>>({
		mode: "onChange",
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: "",
			password: ""
		}
	})
	const { login } = useLogin()
	const router = useRouter()

	const loginFormRef = useRef<HTMLFormElement | null>(null)
	const onSubmit = (formFields: z.infer<typeof loginFormSchema>) =>
		login(formFields, { onSuccess: () => router.push(callbackUrl) })

	const transitionProps: MotionProps = {
		transition: {
			duration: 0.25
		},
		initial: {
			height: tabSizes.register,
			opacity: 0,
			filter: "blur(4px)"
		},
		animate: {
			height: tabSizes.login,
			opacity: 1,
			filter: "blur(0px)"
		},
		exit: {
			height: tabSizes.register,
			opacity: 0,
			filter: "blur(4px)"
		}
	}

	useTabResize({
		errors: form.formState.errors,
		offsetHeight: loginFormRef.current?.clientHeight ?? 0,
		setTabSizes,
		type: "login"
	})
	return (
		<motion.div key="login" {...transitionProps}>
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
							type="button"
							onClick={() => setCurrentTab("register")}
							className="underline"
						>
							Register
						</button>
					</p>
					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</motion.div>
	)
}
