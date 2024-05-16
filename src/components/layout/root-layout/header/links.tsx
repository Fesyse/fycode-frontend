import Link from "next/link"

export const Links = () => {
	return (
		<div className="flex gap-10">
			<Link
				href="/problem/popular"
				className="before:h-px before:w-full before:scale-x-0 before:bg-white before:content-['']"
			>
				Popular problem
			</Link>
			<Link
				href="/dashboard"
				className="before:h-px before:w-full before:scale-x-0 before:bg-white before:content-['']"
			>
				Dashboard
			</Link>
			<Link
				href="/create-problem"
				className="before:h-px before:w-full before:scale-x-0 before:bg-white before:content-['']"
			>
				Create problem
			</Link>
		</div>
	)
}
