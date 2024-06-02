import { type Profile as IProfile } from "@/types/user.type"
import { type FC } from "react"

type ProfileProps = {
	profile: IProfile
}

export const Profile: FC<ProfileProps> = () => {
	return <div>Profile</div>
}
