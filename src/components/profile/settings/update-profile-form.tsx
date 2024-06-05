import { type FC } from "react"
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

type UpdateProfileFormProps = {
	profile: Profile
}

export const UpdateProfileForm: FC<UpdateProfileFormProps> = () => {
	const form = useForm<z.infer<typeof updateUserFormSchema>>({
		mode: "onSubmit",
		resolver: zodResolver(updateUserFormSchema),
		defaultValues: {
			email: "",
			password: "",
			username: ""
		}
	})

	const onSubmit = () => {
		return
	}

	return (
		<Form {...form}>
			<form
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
								<Input {...field} type="text" placeholder="Your username..." />
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
				<Button type="submit">Update</Button>
			</form>
		</Form>
	)
}
