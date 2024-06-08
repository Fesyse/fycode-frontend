import { type FC, useEffect } from "react"
import type { ExtendedProblem } from "@/types/problem.type"
import { useResultsStore } from "@/stores/problem/results.store"
import { Label } from "../../shadcn/label"

type ResultsProps = {
	problem: ExtendedProblem
}

export const Results: FC<ResultsProps> = ({ problem }) => {
	const { error, results, getResults } = useResultsStore(s => s)

	useEffect(() => {
		if (!problem || results) return
		getResults(problem.id)
	}, [results, problem, getResults])
	return error ? (
		<div className="flex flex-col gap-2 text-xl">
			<span className="text-red-600">Compile error</span>
			<div className="rounded-md bg-red-600/25 px-3 py-1.5 text-red-200">
				{error}
			</div>
		</div>
	) : !results ? (
		<div className="flex h-full w-full items-center justify-center opacity-50">
			You must run your code first
		</div>
	) : (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-2">
				<div className="text-xl">
					{results.success ? (
						<span className="text-green-600">Accepted</span>
					) : (
						<span className="text-red-600">Wrong Answer</span>
					)}
				</div>
				<div className="flex items-center gap-2">
					<span>
						Tests passed:{" "}
						<span className="text-green-600">{results.testsStatus.passed}</span>
						,
					</span>
					<span>
						declined:{" "}
						<span className="text-red-600">{results.testsStatus.declined}</span>
					</span>
				</div>
			</div>

			<ul className="flex flex-col gap-6">
				{results.tests.map((test, i) => (
					<li key={i} className="flex flex-col gap-2">
						<div>
							<Label>Input</Label>
							<div className="flex w-full gap-3 rounded-md bg-muted px-3 py-1.5">
								{problem?.functionOptions.args.map((arg, j) => (
									<span key={j}>
										{arg.name}: {JSON.stringify(test.input[j])}
									</span>
								))}
							</div>
						</div>
						<div className="flex w-full gap-2">
							<div className="w-full">
								<Label>Expected</Label>
								<div className="w-full rounded-md bg-muted px-3 py-1.5">
									{JSON.stringify(test.expected)}
								</div>
							</div>
							<div className="w-full">
								<Label>Output</Label>
								<div className="w-full rounded-md bg-muted px-3 py-1.5">
									{JSON.stringify(test.output)}
								</div>
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}
