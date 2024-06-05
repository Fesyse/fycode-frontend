import { userService } from "@/services/user.service"
import { redirect } from "next/navigation"

export default async function SettingsPage({
	params
}: {
	params: { userId: string }
}) {
	let profile = undefined
	try {
		profile = await userService.getProfile(params.userId)
	} catch {
		redirect("/not_found")
	}

	return <div>
		<h1>Update your </h1>
	</div>
}
