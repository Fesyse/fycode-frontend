import type { Metadata } from "next"
import { Suspense } from "react"
import { Dashboard } from "@/components/dashboard"

export const metadata: Metadata = {
	title: "Dashboard"
}

export default function DashboardPage() {
	return (
		<div className="flex flex-col items-center gap-10">
			<div className="flex flex-col items-center space-y-2 text-center">
				<h1 className="text-4xl max-xl:text-2xl">Explore problems</h1>
				<h2 className="text-foreground/50 max-xl:text-base">
					Find new problems for you, to challenge yourself!
				</h2>
			</div>
			<Suspense>
				<Dashboard />
			</Suspense>
		</div>
	)
}
