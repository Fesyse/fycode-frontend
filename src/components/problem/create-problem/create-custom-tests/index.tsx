"use client"

import { AnimatePresence, motion } from "framer-motion"
import { FlaskConical, Plus, X } from "lucide-react"
import { type FC, useState } from "react"
import { type CustomTest } from "@/types/problem.type"
import { CustomTestsInfo } from "@/components/layout/problem-layout/create-problem/custom-tests-info"
import { Button } from "@/components/shadcn/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/shadcn/card"
import { Input } from "@/components/shadcn/input"
import { Label } from "@/components/shadcn/label"
import { ResizablePanel } from "@/components/shadcn/resizable"
import { opacityTransitionProps } from "@/lib/react-utils"
import { useCreateProblemStore } from "@/stores/problem/create-problem.store"
import { useUserStore } from "@/stores/user.store"

export const CreateCustomTests: FC = () => {
	const user = useUserStore(s => s.user)
	const { problem, updateProblem } = useCreateProblemStore()
	const [selectedTestId, setSelectedTestId] = useState<number>(0)

	const addTest = () => {
		const { testsOptions } = problem
		const newTests: CustomTest[] = [
			...(testsOptions?.tests ?? []),
			{ input: [] }
		]

		updateProblem(
			{
				testsOptions: {
					useCustomTests: testsOptions?.useCustomTests ?? false,
					totalChecks: testsOptions?.totalChecks ?? 100,
					tests: newTests
				}
			},
			user?.id
		)
	}
	const removeTest = (index: number) => {
		const { testsOptions } = problem
		const newTests = testsOptions?.tests?.filter((_, i) => i !== index)

		updateProblem(
			{
				testsOptions: {
					useCustomTests: testsOptions?.useCustomTests ?? false,
					totalChecks: testsOptions?.totalChecks ?? 100,
					tests: newTests
				}
			},
			user?.id
		)
	}
	const addArg = () => {
		const { testsOptions } = problem
		const newTests: CustomTest[] | undefined = testsOptions?.tests?.map(
			(test, i) => {
				if (i === selectedTestId) {
					return {
						// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
						input: [...test.input, ""]
					}
				} else return test
			}
		)
		updateProblem(
			{
				testsOptions: {
					useCustomTests: testsOptions?.useCustomTests ?? false,
					totalChecks: testsOptions?.totalChecks ?? 100,
					tests: newTests
				}
			},
			user?.id
		)
	}

	const handleArgumentChange = (value: string, index: number) => {
		const { testsOptions } = problem
		const newTests: CustomTest[] | undefined = testsOptions?.tests?.map(
			(test, i) => {
				if (i === selectedTestId) {
					return {
						// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return
						input: test.input.map((arg, j) => (j === index ? value : arg))
					}
				} else return test
			}
		)
		updateProblem(
			{
				testsOptions: {
					useCustomTests: testsOptions?.useCustomTests ?? false,
					totalChecks: testsOptions?.totalChecks ?? 100,
					tests: newTests
				}
			},
			user?.id
		)
	}

	return (
		<ResizablePanel minSize={25} defaultSize={40}>
			<Card className="relative h-full w-full overflow-hidden rounded-xl bg-editor">
				<CardHeader className="bg-muted py-3">
					<CardTitle className="flex items-end gap-1">
						<FlaskConical size={28} color="green" /> <span>Custom tests</span>
					</CardTitle>
					<CardDescription>
						You dont need to provide a singular test, if you are planning on
						using default tests <CustomTestsInfo className="bg-editor" />
					</CardDescription>
				</CardHeader>
				<CardContent className="bg-editor py-3">
					<div className="flex flex-col gap-6">
						<ul className="flex gap-2 flex-wrap">
							{problem.testsOptions?.tests?.map((_, i) => (
								<Button
									key={i}
									onClick={() => setSelectedTestId(i)}
									className="bg-muted text-foreground hover:bg-muted/75 gap-2"
									variant="outline"
								>
									Test {i + 1}{" "}
									<X role="button" size={16} onClick={() => removeTest(i)} />
								</Button>
							))}
							<Button
								onClick={addTest}
								className="bg-muted text-foreground hover:bg-muted/75"
								variant="outline"
								size="icon"
							>
								<Plus />
							</Button>
						</ul>
						<AnimatePresence>
							{problem.testsOptions?.tests?.map((test, i) =>
								selectedTestId === i ? (
									<motion.div
										key={i}
										{...opacityTransitionProps}
										className="flex gap-2 items-end"
									>
										{test.input.map((arg, j) => (
											<div key={j} className="max-w-32">
												<Label htmlFor={`argument-${i}-${j}`}>
													Argument {j + 1}
												</Label>
												<div className="relative">
													<Input
														id={`argument-${i}-${j}`}
														value={
															typeof arg === "string"
																? arg
																: JSON.stringify(arg)
														}
														onChange={e =>
															handleArgumentChange(e.target.value, j)
														}
														className="bg-muted pr-7"
													/>
													<X
														size={14}
														role="button"
														className="absolute right-2 top-1/2 -translate-y-1/2"
													/>
												</div>
											</div>
										))}
										{test.input.length < 4 ? (
											<Button
												onClick={addArg}
												className="bg-muted text-foreground hover:bg-muted/75"
												variant="outline"
												size="icon"
											>
												<Plus />
											</Button>
										) : null}
									</motion.div>
								) : null
							)}
						</AnimatePresence>
					</div>
				</CardContent>
			</Card>
		</ResizablePanel>
	)
}
