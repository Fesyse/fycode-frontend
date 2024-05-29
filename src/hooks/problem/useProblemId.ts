import { problemService } from "@/services/problem.service"
import { useMutation } from "@tanstack/react-query"

export const useProblemId = () => {
	return useMutation({
		mutationKey: ["get-next-problem-id"],
		mutationFn: (opts: {
			currentProblemId: number
			type: "next" | "prev" | "random"
		}) =>
			opts.type === "next"
				? problemService.getNextProblemId(opts.currentProblemId)
				: opts.type === "prev"
					? problemService.getPrevProblemId(opts.currentProblemId)
					: problemService.getRandomProblemId()
	})
}
