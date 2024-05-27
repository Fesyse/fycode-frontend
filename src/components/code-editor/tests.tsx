import { type FC, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import type { CustomTest } from "@/types/test.type"
import type { ExtendedProblem } from "@/types/problem.type"
import { Label } from "@/components/shadcn/label"
import { Input } from "@/components/shadcn/input"
import { Button } from "@/components/shadcn/button"
import { opacityTransitionProps } from "@/lib/react-utils"

type TestsProps = {
	problem: ExtendedProblem | undefined
	isLoading: boolean
}

const defaultCustomTests = [
	{
		input: [
			{ value: "", name: "num1", type: "number" },
			{ value: "", name: "num2", type: "number" }
		]
	},
	{
		input: [
			{ value: "", name: "num1", type: "number" },
			{ value: "", name: "num2", type: "number" }
		]
	}
]

export const Tests: FC<TestsProps> = ({}) => {
	const [customTests, setCustomTests] =
		useState<CustomTest[]>(defaultCustomTests)
	const [selectedTestId, setSelectedTestId] = useState<number>(0)

	const handleTestArgumentChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		id: number
	) => {
		/* firstly we check if selectedTestId = i (otherwise skipping it), if so changing input property to => checking if id = j (otherwise skipping it), if so changing value from input */
		setCustomTests(p =>
			p.map((t, i) =>
				selectedTestId === i
					? {
							input: t.input.map((a, j) =>
								id === j ? { ...a, value: e.target.value } : a
							)
						}
					: t
			)
		)
	}

	return (
		<div className="flex flex-col gap-6">
			<ul className="flex gap-2">
				{customTests.map((_, i) => (
					<Button
						className="bg-muted text-foreground hover:bg-muted/75"
						onClick={() => setSelectedTestId(i)}
						key={i}
						variant="outline"
					>
						Test {i + 1}
					</Button>
				))}
			</ul>
			<ul>
				<AnimatePresence>
					{customTests.map((test, i) =>
						selectedTestId === i ? (
							<motion.li key={i} {...opacityTransitionProps}>
								<ul className="flex flex-col gap-6">
									{test.input.map((arg, j) => (
										<li className="grid gap-2" key={j}>
											<Label className="text-muted-foreground">
												{arg.name} =
											</Label>
											<Input
												onChange={e => handleTestArgumentChange(e, j)}
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
