import { cn } from "@/lib/utils"
import { type FC } from "react"

type MenuProps = {
	size?: number
}

export const Menu: FC<MenuProps> = ({ size }) => {
	return (
		<svg
			strokeWidth="1.5"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			style={{
				width: size,
				height: size
			}}
			className={cn({ "h-5 w-5": !size })}
		>
			<path
				d="M3 5H11"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			></path>
			<path
				d="M3 12H16"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			></path>
			<path
				d="M3 19H21"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			></path>
		</svg>
	)
}
