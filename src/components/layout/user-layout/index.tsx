"use client"

import { titleString } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { FC, PropsWithChildren } from "react"
import { z } from "zod"

type UserLayoutProps = {
	params: { userId: string }
}

export const UserLayout: FC<PropsWithChildren<UserLayoutProps>> = ({
	params,
	children
}) => {
	const pathname = usePathname()
	const lastRoute = pathname.split("/")[pathname.split("/").length - 1]!

	const isGeneralPage = z.string().cuid().safeParse(lastRoute).success
	const isSettingsPage = lastRoute.startsWith("settings")

	const baseUrl = `/user/${params.userId}`
	return (
		<main className="flex flex-1 flex-col gap-4 md:gap-8 md:p-10">
			<div className="mx-auto grid w-full max-w-[1440px] gap-2">
				<h1 className="text-3xl font-semibold">
					{titleString(isGeneralPage ? "General" : lastRoute)}
				</h1>
			</div>
			<div className="mx-auto grid w-full max-w-[1440px] items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[140px_1fr]">
				<nav
					className="grid gap-4 border-r text-sm text-muted-foreground"
					x-chunk="dashboard-04-chunk-0"
				>
					<Link
						href={baseUrl}
						className={isGeneralPage ? "font-semibold text-primary" : ""}
					>
						General
					</Link>
					<Link
						href={baseUrl + "/settings"}
						className={isSettingsPage ? "font-semibold text-primary" : ""}
					>
						Settings
					</Link>
				</nav>
				<div className="grid gap-6">{children}</div>
			</div>
		</main>
	)
}
