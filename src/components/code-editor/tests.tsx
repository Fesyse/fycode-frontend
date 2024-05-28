import { type FC, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import type { ExtendedProblem } from "@/types/problem.type"
import { Label } from "@/components/shadcn/label"
import { Input } from "@/components/shadcn/input"
import { Button } from "@/components/shadcn/button"
import { opacityTransitionProps } from "@/lib/react-utils"
import { Plus } from "lucide-react"
import { getDefaultArgumentValue } from "@/lib/utils"
import { useTestsStore } from "@/stores/tests.store"

type TestsProps = {
	problem: ExtendedProblem | undefined
}

export const Tests: FC<TestsProps> = ({ problem }) => {
	const { tests, addTest, updateTest } = useTestsStore(s => s)
	const [selectedTestId, setSelectedTestId] = useState<number>(0)

	return (
		<div className="flex flex-col gap-6">
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
							addTest({
								// @ts-expect-error ts says that problem.functionOptions.args need to be Argument type intead of ExtendedArgument type
								input: problem?.functionOptions.args.map(arg => ({
									name: arg.name,
									type: arg.type,
									value: getDefaultArgumentValue(arg.type)
								}))
							})
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
													updateTest(e.target.value, selectedTestId, j)
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
		</div>
	)
}
