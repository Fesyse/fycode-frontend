"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Pen } from "lucide-react"
import Image, { type ImageProps } from "next/image"
import { type FC, useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useUpdateAvatar } from "@/hooks/user/useUpdateAvatar"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@/components/shadcn/tooltip"
import { imageSchema } from "@/lib/schemas"

// import { useForm } from "react-hook-form"

type UserAvatarProps = ImageProps & { src?: string }

type UpdateAvatarForm = {
	avatar: FileList
}

export const UserAvatar: FC<UserAvatarProps> = ({ alt, ...props }) => {
	const { mutate: updateAvatar } = useUpdateAvatar()
	const form = useForm<UpdateAvatarForm>({
		resolver: zodResolver(imageSchema),
		mode: "onChange"
	})

	const onSubmit = (data: UpdateAvatarForm) => {
		if (!data.avatar[0]) return toast.error("File must be uploaded.")

		const formData = new FormData()
		formData.append("avatar", data.avatar[0])

		updateAvatar(formData)
	}

	console.log(form.getValues())

	useEffect(() => {
		const subscription = form.watch(() => void form.handleSubmit(onSubmit)())
		return () => subscription.unsubscribe()
	}, [form.handleSubmit, form.watch])

	return (
		<form>
			<TooltipProvider>
				<Tooltip delayDuration={0}>
					<TooltipTrigger asChild>
						<button className="relative">
							<Image alt={alt} {...props} />
							<Pen size={18} className="absolute -right-1 -top-1" />
							<input
								{...form.register("avatar")}
								type="file"
								className="absolute left-0 top-0 h-full w-full opacity-0"
							/>
						</button>
					</TooltipTrigger>
					<TooltipContent>Change your avatar</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</form>
	)
}
