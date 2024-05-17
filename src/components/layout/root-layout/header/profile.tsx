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
import { useUser } from "@/hooks/user/useUser"
import { Package, PackagePlus, Rocket, Settings, User2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export const Profile = () => {
	const { user, isLoading, isUnauthorized } = useUser()
	const lastUserProblemId: string | null =
		typeof window !== "undefined"
			? localStorage.getItem("last-problem-id")
			: null

	const lastProblemLink = lastUserProblemId
		? `/problem/${lastUserProblemId}`
		: "/dashboard"
	const dropDownItemProps = { className: "flex gap-2", asChild: true }
	console.log(user)

	return (
		<div>
			{!isUnauthorized ? (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<button>
							{isLoading && !isUnauthorized ? (
								<Skeleton className="inline aspect-square w-[36px] rounded-full" />
							) : (
								<Image
									className="rounded-full border border-border p-1"
									src={user?.avatar ?? "/user-round.svg"}
									width={36}
									height={36}
									alt="username-image"
								/>
							)}
						</button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-48">
						<DropdownMenuLabel>{user?.username}</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem {...dropDownItemProps}>
								<Link href="/profile">
									<User2 /> <span>Profile</span>
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem {...dropDownItemProps}>
								<Link href="/profile/settings">
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
					</DropdownMenuContent>
				</DropdownMenu>
			) : (
				<Button className="flex gap-2" asChild>
					<Link href={`/auth?callbackUrl=/dashboard`}>
						Sign up <Rocket />
					</Link>
				</Button>
			)}
		</div>
	)
}
