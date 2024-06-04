import { type FC } from "react"
import Image from "next/image"
import dayjs from "dayjs"
import { type Profile as IProfile } from "@/types/user.type"
import { CopyIdButton } from "./copy-id-button"

type ProfileProps = {
	profile: IProfile
}

export const Profile: FC<ProfileProps> = ({ profile }) => {
	return (
		<div className="flex h-full items-center justify-center gap-10">
			<Image
				className="aspect-square h-32 w-32 rounded-full border border-border object-cover p-1"
				src={profile.avatar ?? "/user-round.svg"}
				width={2048}
				height={2048}
				alt="username-image"
			/>
			<div className="flex flex-col gap-3">
				<div>
					<p className="flex items-start gap-1 text-xl">
						{profile.username} <CopyIdButton id={profile.id} />
					</p>
					<p className="text-xs text-foreground/50">{profile.email}</p>
				</div>
				{/* eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */}
				<p>Member since: {dayjs(profile.createdAt).format("MMMM D, YYYY")}</p>
			</div>
		</div>
	)
}
