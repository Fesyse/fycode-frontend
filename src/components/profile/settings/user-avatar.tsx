import { type FormEventHandler, type FC, useRef } from "react"
import Image, { type ImageProps } from "next/image"
import { Pen } from "lucide-react"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@/components/shadcn/tooltip"

type UserAvatarProps = ImageProps & { src?: string }

export const UserAvatar: FC<UserAvatarProps> = ({ alt, ...props }) => {
	const formRef = useRef<HTMLFormElement | null>(null)

	const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
		// TODO: fix bug, when preventDefault function not working, update avatar with userService

		e.preventDefault()
		if (!formRef) return
		console.log(e.target)
	}
	return (
		<form onSubmit={handleSubmit} ref={formRef}>
			<TooltipProvider>
				<Tooltip delayDuration={0}>
					<TooltipTrigger asChild>
						<button className="relative">
							<Image alt={alt} {...props} />
							<Pen size={18} className="absolute -right-1 -top-1" />
							<input
								type="file"
								title=""
								onChange={() => formRef.current?.submit()}
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
