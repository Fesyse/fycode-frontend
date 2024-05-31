import { Card } from "@/components/shadcn/card"
import { userService } from "@/services/user.service"

export default async function UserPage({
	params
}: {
	params: { userId: string }
}) {
	const profile = await userService.getProfile(params.userId)
	return (
		<div>
			<div className="grid grid-cols-2 gap-2">
				<Card></Card>
			</div>
		</div>
	)
}
