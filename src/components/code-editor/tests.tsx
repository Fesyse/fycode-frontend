import { type FC, useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import type { ExtendedProblem } from "@/types/problem.type"
import { Label } from "@/components/shadcn/label"
import { Input } from "@/components/shadcn/input"
import { Button } from "@/components/shadcn/button"
import { opacityTransitionProps } from "@/lib/react-utils"
import { Plus } from "lucide-react"
import { getDefaultArgumentValue } from "@/lib/utils"
import { useTestsStore } from "@/stores/problem/tests.store"
import { Skeleton } from "../shadcn/skeleton"

type TestsProps = {
	problem: ExtendedProblem | undefined
	isLoading: boolean
}

export const Tests: FC<TestsProps> = ({ problem, isLoading }) => {
	const { tests, getTests, addTest, updateTest } = useTestsStore(s => s)
	const [selectedTestId, setSelectedTestId] = useState<number>(0)

	useEffect(() => {
		if (!problem) return
		getTests(problem.id)
	}, [problem, getTests])

	return (
		<div className="flex flex-col gap-6">
			{isLoading || !problem ? (
				<>
					<Skeleton className="h-[5rem] w-full bg-muted-foreground/50" />
				</>
			) : (
				<>
					<ul className="flex gap-2">
						{tests.map((_, i) => (
							<Button
								key={i}
								onClick={() => setSelectedTestId(i)}
								className="bg-muted text-foreground hover:bg-muted/75"
								variant="outline"
							>
								Test {i + 1}
							</Button>
						))}
						{tests.length < 8 ? (
							<Button
								onClick={() => {
									addTest(
										{
											input: problem?.functionOptions.args.map(arg => ({
												name: arg.name,
												type: arg.type,
												value: getDefaultArgumentValue(arg.type)
											}))
										},
										problem?.id
									)
								}}
								className="bg-muted text-foreground hover:bg-muted/75"
								variant="outline"
								size="icon"
							>
								<Plus />
							</Button>
						) : null}
					</ul>
					<ul>
						<AnimatePresence>
							{tests.map((test, i) =>
								selectedTestId === i ? (
									<motion.li key={i} {...opacityTransitionProps}>
										<ul className="flex flex-col gap-6">
											{test.input.map((arg, j) => (
												<li className="grid gap-2" key={j}>
													<Label className="text-muted-foreground">
														{arg.name} =
													</Label>
													<Input
														onChange={e =>
															updateTest({
																value: e.target.value,
																selectedTestId,
																id: j,
																problemId: problem.id
															})
														}
														value={arg.value}
														className="bg-muted"
													/>
												</li>
											))}
										</ul>
									</motion.li>
								) : null
							)}
						</AnimatePresence>
					</ul>
				</>
			)}
		</div>
	)
}
