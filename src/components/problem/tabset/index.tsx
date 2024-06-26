"use client"

import { AnimatePresence, type MotionProps, motion } from "framer-motion"
import { BugPlay, TestTube } from "lucide-react"
import { type FC, memo, useState } from "react"
import type { ExtendedProblem } from "@/types/problem.type"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { Button } from "@/components/shadcn/button"
import { Card, CardContent, CardHeader } from "@/components/shadcn/card"
import { ResizablePanel } from "@/components/shadcn/resizable"
import { ScrollArea } from "@/components/shadcn/scroll-area"
import { Results } from "./results"
import { Tests } from "./tests"
import { useResultsStore } from "@/stores/problem/results.store"

export type TabsetProps = {
	problem: ExtendedProblem
}

export const Tabset: FC<TabsetProps> = memo(function Tabset({ problem }) {
	const { tab, setTab } = useResultsStore()
	const [height, setHeight] = useState(40)

	const isMobile = useMediaQuery("(max-width: 760px)")

	const motionSectionProps: MotionProps = {
		transition: {
			duration: 0.25
		},
		initial: {
			opacity: 0,
			filter: "blur(4px)",
			position: "absolute"
		},
		animate: {
			opacity: 1,
			filter: "blur(0px)",
			position: "relative"
		},
		exit: {
			opacity: 0,
			filter: "blur(4px)",
			position: "absolute"
		}
	}
	return (
		<ResizablePanel
			onResize={size => setHeight(size)}
			minSize={25}
			defaultSize={40}
		>
			<Card className="group/wrapper relative h-full w-full overflow-hidden rounded-xl bg-editor">
				<CardHeader className="flex flex-row items-center justify-between bg-muted px-1 py-1">
					<div className="flex gap-2 text-muted-foreground">
						<Button
							size="sm"
							onClick={() => setTab("tests")}
							className="flex items-center bg-muted pl-2.5 pr-4 text-foreground hover:bg-editor/50"
						>
							<TestTube color="green" />
							Tests
						</Button>
						<Button
							size="sm"
							onClick={() => setTab("results")}
							className="flex items-center gap-1 bg-muted px-2.5 text-foreground hover:bg-editor/50"
						>
							<BugPlay color="green" />
							Results
						</Button>
					</div>
				</CardHeader>
				<CardContent className="bg-editor px-0 py-3">
					<ScrollArea
						style={{
							height: `calc(${height}vh - ${isMobile ? "9rem" : "7.25rem"})`
						}}
						scrollbarClassName="mr-1"
						className="flex items-center gap-4 px-6"
					>
						<AnimatePresence>
							{tab === "tests" ? (
								<motion.section
									key="tests"
									className="h-full"
									{...motionSectionProps}
								>
									<Tests problem={problem} />
								</motion.section>
							) : (
								<motion.section
									key="results"
									className="h-full"
									{...motionSectionProps}
								>
									<Results problem={problem} />
								</motion.section>
							)}
						</AnimatePresence>
					</ScrollArea>
				</CardContent>
			</Card>
		</ResizablePanel>
	)
})
