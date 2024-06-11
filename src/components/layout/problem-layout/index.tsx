"use client"

import type { FC, PropsWithChildren } from "react"
import { useProblem } from "@/hooks/problem/useProblem"
import { Header } from "./header"

type ProblemLayoutProps = {
	problemId: string
}

export const ProblemLayout: FC<PropsWithChildren<ProblemLayoutProps>> = ({
	problemId,
	children
}) => {
	const { data: problem } = useProblem(problemId)

	return (
		<main className="flex h-screen max-h-screen w-full flex-col gap-3 overflow-hidden p-4">
			<Header problemId={problem?.id} />
			<section className="flex h-[calc(100vh-5rem)] items-center justify-center">
				{children}
			</section>
		</main>
	)
}
