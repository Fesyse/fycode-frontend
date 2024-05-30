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
import { useEffect } from "react"
import { Button } from "@/components/shadcn/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	DropdownMenuGroup,
	DropdownMenuItem
} from "@/components/shadcn/dropdown-menu"
import { Skeleton } from "@/components/shadcn/skeleton"
import { useLogout } from "@/hooks/auth/useLogout"
import { useUserStore } from "@/stores/user.store"
import { useUser } from "@/hooks/user/useUser"
import { cn } from "@/lib/utils"

type ProfileProps = {
	avatarRatio?: number
}

export const Profile: React.FC<ProfileProps> = ({ avatarRatio }) => {
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

	const dropDownItemProps = { className: "flex gap-2", asChild: true }

	useEffect(() => {
		if (userFromStore) void refetchUser()
	}, [refetchUser, userFromStore])

	return (
		<div className="flex w-full max-w-32 justify-end">
			{isLoading ? (
				<Skeleton
					className={cn("block aspect-square h-12 rounded-full", {
						"h-12": !avatarRatio,
						[`h-[${avatarRatio}px]`]: !avatarRatio
					})}
				/>
			) : user && userFromStore && isAuthorized ? (
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Image
							className={cn(
								"aspect-square rounded-full border border-border object-cover p-1",
								{
									"h-12": !avatarRatio,
									[`h-[${avatarRatio}px]`]: !avatarRatio
								}
							)}
							src={user?.avatar ?? "/user-round.svg"}
							width={36}
							height={36}
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
								<Link href="/user/${user.id}/settings">
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
			) : (
				<Button className="flex gap-2" asChild>
					<Link href="/auth?callbackUrl=/dashboard">
						Sign up <Rocket />
					</Link>
				</Button>
			)}
		</div>
	)
}
