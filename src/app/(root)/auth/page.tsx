import type { Metadata } from "next"
import { Auth } from "@/components/auth"

export const metadata: Metadata = {
	title: "Authentication"
}

export default function AuthPage({
	searchParams: { callbackUrl }
}: {
	searchParams: { callbackUrl?: string }
}) {
	return (
		<div className="flex h-full w-full items-center justify-center">
			<Auth callbackUrl={callbackUrl} />
		</div>
	)
}
