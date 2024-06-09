import { type FC } from "react"
import Link from "next/link"
import { Separator } from "@/components/shadcn/separator"
import { cn } from "@/lib/utils"

type LinksProps = {
	orientation?: "horizontal" | "vertical"
}

export const Links: FC<LinksProps> = ({ orientation = "horizontal" }) => {
	return (
		<nav
			className={cn("flex max-lg:text-sm", {
				"flex-col items-start gap-3": orientation === "vertical",
				"flex-row items-center gap-10 max-xl:gap-6":
					orientation === "horizontal"
			})}
		>
			<Link
				href="/problem/popular"
				className="before:h-px before:w-full before:scale-x-0 before:bg-white before:content-['']"
			>
				Popular problem
			</Link>
			{orientation === "horizontal" ? (
				<Separator className="h-5" orientation="vertical" />
			) : null}
			<Link
				href="/dashboard"
				className="before:h-px before:w-full before:scale-x-0 before:bg-white before:content-['']"
			>
				Dashboard
			</Link>
			{orientation === "horizontal" ? (
				<Separator className="h-5" orientation="vertical" />
			) : null}
			<Link
				href="/create-problem"
				className="before:h-px before:w-full before:scale-x-0 before:bg-white before:content-['']"
			>
				Create problem
			</Link>
		</nav>
	)
}
