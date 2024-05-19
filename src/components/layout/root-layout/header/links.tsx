import { Separator } from "@/components/shadcn/separator"
import Link from "next/link"

export const Links = () => {
	return (
		<div className="flex items-center gap-10">
			<Link
				href="/problem/popular"
				className="before:h-px before:w-full before:scale-x-0 before:bg-white before:content-['']"
			>
				Popular problem
			</Link>
			<Separator className="h-5" orientation="vertical" />
			<Link
				href="/dashboard"
				className="before:h-px before:w-full before:scale-x-0 before:bg-white before:content-['']"
			>
				Dashboard
			</Link>
			<Separator className="h-5" orientation="vertical" />
			<Link
				href="/create-problem"
				className="before:h-px before:w-full before:scale-x-0 before:bg-white before:content-['']"
			>
				Create problem
			</Link>
		</div>
	)
}
