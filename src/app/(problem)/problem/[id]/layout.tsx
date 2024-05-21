import { ProblemLayout } from "@/components/layout/problem-layout"
import { type PropsWithChildren } from "react"

export default function Layout({
	children,
	params
}: PropsWithChildren<{ params: { id: string } }>) {
	return <ProblemLayout problemId={params.id}>{children}</ProblemLayout>
}
