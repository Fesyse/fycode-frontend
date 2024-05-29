import { problemService } from "@/services/problem.service"
import type {
	GetSomeProblems,
	GetSomeProblemsResponse
} from "@/types/problem.type"
import { useQuery, type UseQueryResult } from "@tanstack/react-query"

type UseProblems = (
	options: GetSomeProblems
) => UseQueryResult<GetSomeProblemsResponse, Error>

export const useProblems: UseProblems = options => {
	return useQuery({
		initialData: { maxPage: 10, problems: [] },
		queryKey: ["problems-page", JSON.stringify(options)],
		queryFn: () => problemService.getPage(options)
	})
}
