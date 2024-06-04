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
			<div className="grid grid-cols-[1.35fr_1.1fr] gap-6 max-xl:grid-cols-[1fr]">
				<Card>
					<CardHeader>
						<CardTitle className="text-center">Profile</CardTitle>
					</CardHeader>
					<CardContent className="h-[75%]">
						<Profile profile={profile} />
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle className="text-center">Problems stats</CardTitle>
					</CardHeader>
					<CardContent className="h-[75%]">
						<ProblemsStats problemsCount={problemsCount} />
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
