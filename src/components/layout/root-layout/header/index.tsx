"use client"

import Link from "next/link"
import { Logo } from "@/components/ui/logo"
import { Profile } from "./profile"
import { Links } from "./links"
import useMediaQuery from "@/hooks/useMediaQuery"

export const Header = () => {
	const isMobile = useMediaQuery("(max-width: 760px)")
	console.log(isMobile)

	return (
		<header className="sticky left-0 top-0 flex w-full justify-center border-b border-border backdrop-blur-lg">
			<div className="flex w-full max-w-[1440px] items-center justify-between gap-6 p-4">
				<div className="flex w-full max-w-32 select-none items-center overflow-hidden text-ellipsis text-xl">
					<Link href="/">
						<Logo />
					</Link>
				</div>
				{!isMobile ? <Links /> : null}
				<Profile size={isMobile ? 50 : undefined} />
			</div>
		</header>
	)
}
