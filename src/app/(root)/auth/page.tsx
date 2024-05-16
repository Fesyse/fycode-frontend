import { Auth } from "@/components/auth"
import type { Metadata } from "next"

export const metadata: Metadata = {
	title: "Authentication"
}

export default function Page() {
	return (
		<div className="flex h-full w-full items-center justify-center">
			<Auth />
		</div>
	)
}
