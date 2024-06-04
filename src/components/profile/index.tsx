import { type FC } from "react"
import Image from "next/image"
import dayjs from "dayjs"
import { type Profile as IProfile } from "@/types/user.type"
import { CopyIdButton } from "./copy-id-button"
import { Button } from "../shadcn/button"
import Link from "next/link"

type ProfileProps = {
	profile: IProfile
}

export const Profile: FC<ProfileProps> = ({ profile }) => {
	return (
		<div className="flex h-full items-center justify-center gap-10 max-xl:gap-6">
			<Image
				className="aspect-square h-32 w-32 rounded-full border border-border object-cover p-1"
				src={profile.avatar ?? "/user-round.svg"}
				width={2048}
				height={2048}
				alt="username-image"
			/>
			<div className="leading-3">
				<p className="flex items-start gap-1 text-xl">
					{profile.username} <CopyIdButton id={profile.id} />
				</p>
				<p className="mb-3 text-xs text-foreground/50">{profile.email}</p>
				{/* eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */}
				<p>Member since: {dayjs(profile.createdAt).format("MMMM D, YYYY")}</p>
				<p>
					Last solved problem:
					<Button className="px-1 py-2" variant="link" asChild>
						<Link href={`/problem/${profile.lastSolvedProblem.id}`}>
							{profile.lastSolvedProblem.id}. {profile.lastSolvedProblem.title}
						</Link>
					</Button>
				</p>
			</div>
		</div>
	)
}
