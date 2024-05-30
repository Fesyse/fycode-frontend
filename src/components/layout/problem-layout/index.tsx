"use client"

import { type PropsWithChildren, type FC, useEffect } from "react"
import {
	ResizablePanelGroup,
	ResizablePanel,
	ResizableHandle
} from "@/components/shadcn/resizable"
import { useProblem } from "@/hooks/problem/useProblem"
import { Header } from "./header"
import { Description } from "./description"
import { redirect } from "next/navigation"

type ProblemLayoutProps = {
	problemId: string
}

export const ProblemLayout: FC<PropsWithChildren<ProblemLayoutProps>> = ({
	problemId,
	children
}) => {
	const { data: problem, isLoading, isError } = useProblem(problemId)

	useEffect(() => {
		if (!problem && !isError) return
		if (isError) return redirect("/dashboard")
	}, [problem, isError])

	return (
		<div className="flex h-screen max-h-screen w-full flex-col gap-3 overflow-hidden p-4">
			<Header problemId={problem?.id} />
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
		</div>
	)
}
