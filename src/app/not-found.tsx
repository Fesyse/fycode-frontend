import { Button } from "@/components/shadcn/button"
import type { Metadata } from "next"
import Link from "next/link"
export const metadata: Metadata = {
	title: "Invalid page"
}

export default function NotFoundPage() {
	return (
		<div className="flex h-screen flex-col items-center justify-center gap-5">
			<div className="flex flex-col items-center">
				<h1 className="text-8xl tracking-wider text-foreground/50">404</h1>
				<h2 className="text-lg">Page was not found</h2>
			</div>
			<Button asChild>
				<Link className="flex items-center gap-2" href="/dashboard">
					Go back to dashboard
				</Link>
			</Button>
		</div>
	)
}
