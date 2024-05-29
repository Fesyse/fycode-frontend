import { Dashboard } from "@/components/dashboard"
import type { Metadata } from "next"
export const metadata: Metadata = {
	title: "Dashboard"
}

export default function DashboardPage() {
	return (
		<div className="flex flex-col items-center gap-10">
			<div className="flex flex-col items-center space-y-2">
				<h1 className="text-4xl">Explore problems</h1>
				<h2 className="text-foreground/50">
					Find new problems for you, to challenge yourself!
				</h2>
			</div>
			<Dashboard />
		</div>
	)
}
