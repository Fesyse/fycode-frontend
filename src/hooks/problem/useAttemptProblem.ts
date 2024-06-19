import { useMutation } from "@tanstack/react-query"
import { type AxiosError } from "axios"
import { useParams } from "next/navigation"
import type { AttemptProblem, SubmitProblem } from "@/types/problem.type"
import { problemService } from "@/services/problem.service"
import { useResultsStore } from "@/stores/problem/results.store"

export type AttemptFunctionProps =
	| {
			type: "attempt"
			data: AttemptProblem
	  }
	| {
			type: "submit"
			data: SubmitProblem
	  }

export const useAttemptProblem = () => {
	const { id } = useParams()
	const problemId = parseInt(id as string)
	const { setResults, setError, setTab } = useResultsStore()

	return useMutation({
		mutationFn: ({ type, data }: AttemptFunctionProps) =>
			type === "attempt"
				? problemService.attempt(problemId, data)
				: problemService.submit(problemId, data),
		onSuccess: results => {
			setTab("results")
			setResults(results, problemId)
		},
		onError: (
			error: AxiosError<{ error: string; message: string; statusCode: number }>
		) => setError(error?.response?.data.message ?? "Something went wrong")
	})
}
