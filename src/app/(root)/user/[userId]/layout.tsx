import { UserLayout } from "@/components/layout/user-layout"
import { type PropsWithChildren } from "react"

export default function Layout({
	children,
	params
}: PropsWithChildren<{ params: { userId: string } }>) {
	return <UserLayout params={params}>{children}</UserLayout>
}
