import { useState, type FC } from "react"
import { TestTube, BugPlay } from "lucide-react"
import { AnimatePresence, motion, type MotionProps } from "framer-motion"
import type { ExtendedProblem } from "@/types/problem.type"
import { Button } from "@/components/shadcn/button"
import { Card, CardHeader, CardContent } from "@/components/shadcn/card"
import { ScrollArea } from "@/components/shadcn/scroll-area"
import { Results } from "./results"
import { Tests } from "./tests"

export type TabsetProps = {
	problem: ExtendedProblem | undefined
	height: number
	isProblemLoading: boolean
}

export const Tabset: FC<TabsetProps> = ({
	problem,
	height,
	isProblemLoading
}) => {
	const [tab, setTab] = useState<"tests" | "results">("tests")

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
						height: `calc(${height}vh - 7.25rem)`
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
								<Tests isLoading={isProblemLoading} problem={problem} />
							</motion.section>
						) : (
							<motion.section
								key="results"
								className="h-full"
								{...motionSectionProps}
							>
								<Results isLoading={isProblemLoading} problem={problem} />
							</motion.section>
						)}
					</AnimatePresence>
				</ScrollArea>
			</CardContent>
		</Card>
	)
}
