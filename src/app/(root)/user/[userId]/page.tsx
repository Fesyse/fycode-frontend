import { Profile } from "@/components/profile"
import { ProblemsStats } from "@/components/profile/problems-stats"
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle
} from "@/components/shadcn/card"
import { userService } from "@/services/user.service"
import { redirect } from "next/navigation"

export default async function UserPage({
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

	const problemsCount = await userService.getProblemsCount(params.userId)
	return (
		<div>
			<head>
				<title>{profile.username + " | Fycode"}</title>
			</head>
			<div className="grid grid-cols-2 gap-2">
				<Card>
					<CardHeader>
						<CardTitle>Problems stats</CardTitle>
					</CardHeader>
					<CardContent>
						<ProblemsStats problemsCount={problemsCount} />
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Profile</CardTitle>
					</CardHeader>
					<CardContent>
						<Profile profile={profile} />
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
