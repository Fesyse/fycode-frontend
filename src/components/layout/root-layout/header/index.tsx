"use client"

import Link from "next/link"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { Logo } from "@/components/ui/logo"
import { Burger } from "./burger"
import { Links } from "./links"
import { Profile } from "./profile"

export const Header = () => {
	const isMobile = useMediaQuery("(max-width: 760px)")

	return (
		<header className="sticky left-0 top-0 flex w-full justify-center border-b border-border backdrop-blur-lg">
			<div className="flex w-full max-w-[1440px] items-center justify-between gap-6 p-4 max-lg:py-2">
				<div className="flex w-full max-w-32 select-none items-center overflow-hidden text-ellipsis text-xl">
					{isMobile ? (
						<Burger />
					) : (
						<Link href="/">
							<Logo />
						</Link>
					)}
				</div>
				{!isMobile ? <Links /> : null}
				<Profile size={isMobile ? 50 : undefined} />
			</div>
		</header>
	)
}
