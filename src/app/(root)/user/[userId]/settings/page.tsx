import { UpdateProfileForm } from "@/components/profile/settings/update-profile-form"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/shadcn/card"
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

	return (
		<main className="mx-auto w-full max-w-xl">
			<head>
				<title>{"Settings | " + profile.username + " | Fycode"}</title>
			</head>
			<Card>
				<CardHeader>
					<CardTitle>Update profile</CardTitle>
					<CardDescription>
						Update your username, email, password or avatar in one-click.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<UpdateProfileForm profile={profile} />
				</CardContent>
			</Card>
		</main>
	)
}
