import { problemService } from "@/services/problem.service"
import { useQuery } from "@tanstack/react-query"

export const useProblem = (problemId: string) => {
	return useQuery({
		initialData: undefined,
		queryKey: ["problem", problemId],
		queryFn: () => problemService.getById(problemId)
	})
}
