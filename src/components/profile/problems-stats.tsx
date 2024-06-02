"use client"

import { useEffect, useState, type FC } from "react"
import { buildStyles, CircularProgressbar } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { type ProblemsCount } from "@/types/user.type"
import { Check } from "lucide-react"
import { Button } from "../shadcn/button"
import { motion, useAnimation } from "framer-motion"

type ProblemsStatsProps = {
	problemsCount: ProblemsCount
}

export const ProblemsStats: FC<ProblemsStatsProps> = ({ problemsCount }) => {
	const defaultProblemsCount = {
		problems: problemsCount.problems,
		userProblems: problemsCount.userProblems
	}
	const [selectedProblemsCount, setSelectedProblemsCount] =
		useState(defaultProblemsCount)

	const controls = useAnimation()

	useEffect(() => {
		void controls.start({
			opacity: [0, 1],
			transition: { duration: 1 }
		})
	}, [selectedProblemsCount, controls])
	return (
		<div className="flex items-center justify-between">
			<div className="relative aspect-square w-44">
				<CircularProgressbar
					maxValue={1}
					value={
						selectedProblemsCount.userProblems / selectedProblemsCount.problems
					}
					strokeWidth={6}
					styles={buildStyles({
						pathColor: "hsl(var(--muted-foreground))",
						trailColor: "hsl(var(--muted))"
					})}
				/>
				<div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 select-none flex-col items-center">
					<p className="flex items-end">
						<motion.strong className="text-3xl" animate={controls}>
							{selectedProblemsCount.userProblems}
						</motion.strong>
						<motion.span
							className="text-sm text-foreground/50"
							animate={controls}
						>
							/{selectedProblemsCount.problems}
						</motion.span>
					</p>
					<span className="flex items-center">
						<Check /> Solved
					</span>
				</div>
			</div>
			<div className="grid min-w-40 grid-rows-3 items-center gap-2">
				<Button
					onMouseEnter={() =>
						setSelectedProblemsCount({
							problems: problemsCount.easyProblems,
							userProblems: problemsCount.userEasyProblems
						})
					}
					onMouseLeave={() => setSelectedProblemsCount(defaultProblemsCount)}
					variant="secondary"
					className="flex cursor-default flex-col items-center"
				>
					<span className="text-teal-600">Easy</span>
					<span>
						{problemsCount.userEasyProblems}/{problemsCount.easyProblems}
					</span>
				</Button>
				<Button
					onMouseEnter={() =>
						setSelectedProblemsCount({
							problems: problemsCount.mediumProblems,
							userProblems: problemsCount.userMediumProblems
						})
					}
					onMouseLeave={() => setSelectedProblemsCount(defaultProblemsCount)}
					variant="secondary"
					className="flex cursor-default flex-col items-center"
				>
					<span className="text-yellow-600">Med.</span>
					<span>
						{problemsCount.userMediumProblems}/{problemsCount.mediumProblems}
					</span>
				</Button>
				<Button
					onMouseEnter={() =>
						setSelectedProblemsCount({
							problems: problemsCount.hardProblems,
							userProblems: problemsCount.userHardProblems
						})
					}
					onMouseLeave={() => setSelectedProblemsCount(defaultProblemsCount)}
					variant="secondary"
					className="flex cursor-default flex-col items-center"
				>
					<span className="text-red-600">Hard</span>
					<span>
						{problemsCount.userHardProblems}/{problemsCount.hardProblems}
					</span>
				</Button>
			</div>
		</div>
	)
}
