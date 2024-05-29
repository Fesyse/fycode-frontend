import { problemService } from "@/services/problem.service"
import { useUserStore } from "@/stores/user.store"
import { useQuery } from "@tanstack/react-query"

export const useProblem = (problemId: string) => {
	const user = useUserStore(s => s.user)

	return useQuery({
		initialData: undefined,
		queryKey: ["problem", problemId, user?.id],
		queryFn: () => problemService.getById(problemId, user?.id)
	})
}
