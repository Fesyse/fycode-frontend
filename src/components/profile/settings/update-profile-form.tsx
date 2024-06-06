"use client"

import { useEffect, type FC } from "react"
import { useForm } from "react-hook-form"
import { type z } from "zod"
import { type Profile } from "@/types/user.type"
import { updateUserFormSchema } from "@/lib/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/shadcn/button"
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage
} from "@/components/shadcn/form"
import { Input } from "@/components/shadcn/input"
import { UserAvatar } from "./user-avatar"
import { useUpdateUser } from "@/hooks/user/useUpdateUser"

type UpdateProfileFormProps = {
	profile: Profile
}

export const UpdateProfileForm: FC<UpdateProfileFormProps> = ({ profile }) => {
	const { mutateAsync: updateAvatar } = useUpdateUser(profile.id)
	const form = useForm<z.infer<typeof updateUserFormSchema>>({
		mode: "onSubmit",
		resolver: zodResolver(updateUserFormSchema),
		defaultValues: {
			username: profile.username,
			email: profile.email,
			password: ""
		}
	})

	const onSubmit = async (data: z.infer<typeof updateUserFormSchema>) => {
		const user = await updateAvatar(data)
		form.reset({
			email: user.email,
			username: user.username
		})
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col space-y-4"
			>
				<div className="flex w-full items-center gap-4">
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem className="w-full">
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
					<UserAvatar
						src={profile.avatar ?? "/user-round.svg"}
						alt={profile.username + "-avatar"}
						className="aspect-square w-20 rounded-full object-cover"
						width={2048}
						height={2048}
					/>
				</div>
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
				<Button type="submit">Update</Button>
			</form>
		</Form>
	)
}
