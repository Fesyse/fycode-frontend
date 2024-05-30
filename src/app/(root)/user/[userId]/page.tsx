import { userService } from "@/services/user.service"

export default async function Page({ params }: { params: { userId: string } }) {
	const user = await userService.getProfile(params.userId)
	return "WIP"
}
