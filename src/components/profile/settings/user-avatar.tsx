import { type FC } from "react"
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
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<button className="relative">
						<Image alt={alt} {...props} />
						<Pen size={18} className="absolute -right-1 -top-1" />
					</button>
				</TooltipTrigger>
				<TooltipContent>Change your avatar</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
