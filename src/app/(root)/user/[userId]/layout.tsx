import { titleString } from "@/lib/utils"
import { headers } from "next/headers"
import Link from "next/link"
import { type PropsWithChildren } from "react"
import { z } from "zod"

export default function Layout({
	children,
	params
}: PropsWithChildren<{ params: { userId: string } }>) {
	const headersList = headers()
	const pathname = headersList.get("x-current-path")
	const lastRoute =
		pathname?.split("/")[pathname?.split("/").length - 1] ?? "General"
	const isPathnameContainsUserId = z
		.string()
		.cuid()
		.safeParse(lastRoute).success

	const baseUrl = `/user/${params.userId}`
	return (
		<main className="flex flex-1 flex-col gap-4 md:gap-8 md:p-10">
			<div className="mx-auto grid w-full max-w-[1440px] gap-2">
				<h1 className="text-3xl font-semibold">
					{titleString(isPathnameContainsUserId ? "General" : lastRoute)}
				</h1>
			</div>
			<div className="mx-auto grid w-full max-w-[1440px] items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[140px_1fr]">
				<div className="mx-auto grid w-full max-w-[1440px] items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[140px_1fr]">
					<nav
						className="grid gap-4 border-r text-sm text-muted-foreground"
						x-chunk="dashboard-04-chunk-0"
					>
						<Link href={baseUrl} className="font-semibold text-primary">
							General
						</Link>
						<Link href={baseUrl + "/settings"}>Settings</Link>
					</nav>
				</div>
				<div className="grid gap-6">{children}</div>
			</div>
		</main>
	)
}
