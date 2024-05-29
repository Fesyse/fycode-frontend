import { problemService } from "@/services/problem.service"
import { useResultsStore } from "@/stores/problem/results.store"
import { useTestsStore } from "@/stores/problem/tests.store"
import type { AttemptProblem, SubmitProblem } from "@/types/problem.type"
import { useMutation } from "@tanstack/react-query"

export type AttemptFunctionProps =
	| {
			type: "attempt"
			data: AttemptProblem
	  }
	| {
			type: "submit"
			data: SubmitProblem
	  }

export const useAttemptProblem = (problemId: number) => {
	const { setResults, setError } = useResultsStore()
	const {} = useTestsStore()

	return useMutation({
		mutationFn: ({ type, data }: AttemptFunctionProps) =>
			type === "attempt"
				? problemService.attempt(problemId, data)
				: problemService.submit(problemId, data),
		onSuccess: results => setResults(results, problemId),
		onError: error => setError(error.message)
	})
}
