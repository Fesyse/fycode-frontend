import type { FC, ChangeEventHandler } from "react"
import Image, { type ImageProps } from "next/image"
import { Pen } from "lucide-react"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@/components/shadcn/tooltip"
import { useUpdateAvatar } from "@/hooks/user/useUpdateAvatar"

type UserAvatarProps = ImageProps & { src?: string }

export const UserAvatar: FC<UserAvatarProps> = ({ alt, ...props }) => {
	const { mutate: updateAvatar } = useUpdateAvatar()

	const handleSubmit: ChangeEventHandler<HTMLInputElement> = e => {
		const formData = new FormData()
		formData.append("avatar", e.target.files![0] as Blob)

		updateAvatar(formData)
	}

	return (
		<TooltipProvider>
			<Tooltip delayDuration={0}>
				<TooltipTrigger asChild>
					<button className="relative">
						<Image alt={alt} {...props} />
						<Pen size={18} className="absolute -right-1 -top-1" />
						<input
							name="avatar"
							type="file"
							onChange={handleSubmit}
							className="absolute left-0 top-0 h-full w-full opacity-0"
						/>
					</button>
				</TooltipTrigger>
				<TooltipContent>Change your avatar</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
