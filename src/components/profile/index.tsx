import dayjs from "dayjs"
import Image from "next/image"
import Link from "next/link"
import { type FC } from "react"
import { type Profile as IProfile } from "@/types/user.type"
import { Button } from "../shadcn/button"
import { CopyIdButton } from "./copy-id-button"

type ProfileProps = {
	profile: IProfile
}

export const Profile: FC<ProfileProps> = ({ profile }) => {
	return (
		<div className="flex h-full items-center justify-center gap-10 max-xl:gap-6 max-lg:gap-4 max-md:flex-col">
			<Image
				className="aspect-square h-32 w-32 rounded-full border border-border object-cover p-1 max-lg:h-20 max-lg:w-20"
				src={profile.avatar ?? "/user-round.svg"}
				width={2048}
				height={2048}
				alt="username-image"
			/>
			<div className="leading-3 max-xl:leading-[0.5rem] max-xl:text-sm max-md:text-center">
				<p className="flex items-start gap-1 text-xl max-xl:text-base max-md:justify-center">
					{profile.username} <CopyIdButton id={profile.id} />
				</p>
				<p className="mb-3 text-xs text-foreground/50">{profile.email}</p>
				{/* eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */}
				<p>Member since: {dayjs(profile.createdAt).format("MMMM D, YYYY")}</p>
				<p className="max-md:flex max-md:flex-col max-md:items-center max-md:mt-4">
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
