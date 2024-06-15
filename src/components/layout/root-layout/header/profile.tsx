"use client"

import {
	LogOut,
	Package,
	PackagePlus,
	Rocket,
	Settings,
	User2
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { useLogout } from "@/hooks/auth/useLogout"
import { useUser } from "@/hooks/user/useUser"
import { Button } from "@/components/shadcn/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/shadcn/dropdown-menu"
import { Skeleton } from "@/components/shadcn/skeleton"
import { cn } from "@/lib/utils"
import { useUserStore } from "@/stores/user.store"

type ProfileProps = {
	size?: number
}

export const Profile: React.FC<ProfileProps> = ({ size }) => {
	const { user, isAuthorized, refetchUser, isLoading } = useUser()
	const userFromStore = useUserStore(s => s.user)
	const { logout } = useLogout()

	const lastUserProblemId: string | null =
		typeof window !== "undefined"
			? localStorage.getItem("last-problem-id")
			: null
	const lastProblemLink = lastUserProblemId
		? `/problem/${lastUserProblemId}`
		: "/dashboard"
	const lastUserPagePath = usePathname()

	const dropDownItemProps = { className: "flex gap-2", asChild: true }

	useEffect(() => {
		if (userFromStore) void refetchUser()
	}, [refetchUser, userFromStore])

	return (
		<div className="flex justify-end">
			{isLoading ? (
				<Skeleton
					style={{
						height: size,
						width: size
					}}
					className={cn("block aspect-square rounded-full", {
						"h-10": !size
					})}
				/>
			) : !isAuthorized || !user || !userFromStore ? (
				<Button className="flex gap-2" asChild>
					<Link href={`/auth?callbackUrl=${lastUserPagePath}`}>
						Sign up <Rocket />
					</Link>
				</Button>
			) : (
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Image
							className={cn(
								"aspect-square rounded-full border border-border object-cover p-1",
								{
									"h-10 w-10": !size
								}
							)}
							src={user?.avatar ?? "/user-round.svg"}
							style={{
								height: size ? `${size}px` : undefined,
								width: size ? `${size}px` : undefined
							}}
							width={2048}
							height={2048}
							alt="username-image"
						/>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-48">
						<DropdownMenuLabel>{user?.username}</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem {...dropDownItemProps}>
								<Link href={`/user/${user.id}`}>
									<User2 /> <span>Profile</span>
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem {...dropDownItemProps}>
								<Link href={`/user/${user.id}/settings`}>
									<Settings /> <span>Settings</span>
								</Link>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem {...dropDownItemProps}>
								<Link href={lastProblemLink}>
									<Package /> <span>Last problem</span>
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem {...dropDownItemProps}>
								<Link href="/create-problem">
									<PackagePlus /> <span>Create problem</span>
								</Link>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem
								{...dropDownItemProps}
								asChild={false}
								onClick={() => logout()}
							>
								<LogOut /> <span>Logout</span>
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			)}
		</div>
	)
}
