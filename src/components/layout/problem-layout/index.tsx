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

/*
<ResizablePanelGroup direction="horizontal">
	<ResizablePanel className="pr-3" minSize={15} defaultSize={40}>
		<Description
			problem={problem}
			isError={isError}
			isLoading={isLoading}
		/>
	</ResizablePanel>
	<ResizableHandle withHandle />
	<ResizablePanel className="pl-3" minSize={30} defaultSize={60}>
		<section className="flex h-full items-center justify-center">
			{children}
		</section>
	</ResizablePanel>
</ResizablePanelGroup>
*/
