import { ProblemLayout } from "@/components/layout/problem-layout"
import { type PropsWithChildren } from "react"

export default async function Layout({
	children,
	params
}: PropsWithChildren<{ params: { id: string } }>) {
	return <ProblemLayout problemId={params.id}>{children}</ProblemLayout>
}
