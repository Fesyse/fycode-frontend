"use client"

import Link from "next/link"
import { Logo } from "@/components/ui/logo"
import { cn } from "@/lib/utils"
import { useWindowAtTop } from "@/hooks/useWindowAtTop"
import { Profile } from "./profile"
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock"
import { Links } from "./links"

export const Header = () => {
	const [isAtTheTop] = useWindowAtTop()
	const [isBodyScrollLocked] = useBodyScrollLock()

	return (
		<div
			className={cn(
				"fixed left-0 top-0 flex w-full justify-center border-b border-border",
				{ "backdrop-blur-lg": !isAtTheTop, "pr-4": isBodyScrollLocked }
			)}
		>
			<div className="flex w-full max-w-[1440px] items-center justify-between gap-6 p-4">
				<div className="flex select-none items-center overflow-hidden text-ellipsis text-xl">
					<Link href="/">
						<Logo />
					</Link>
				</div>
				<Links />
				<Profile />
			</div>
		</div>
	)
}
