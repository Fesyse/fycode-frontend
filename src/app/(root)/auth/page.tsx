import { Auth } from "@/components/auth"
import type { Metadata } from "next"

export const metadata: Metadata = {
	title: "Authentication"
}

export default function Page({
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
