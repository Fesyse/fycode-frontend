import { axiosWithAuth } from "@/api/interceptors"
import type {
	ExtendedProblem,
	GetSomeProblems,
	GetSomeProblemsResponse
} from "@/types/problem.type"

class ProblemService {
	private BASE_URL = `/problem`

	async getById(id: number) {
		const response = await axiosWithAuth.get<ExtendedProblem>(
			`${this.BASE_URL}/${id}`
		)
		return response.data
	}

	async getPage(options: GetSomeProblems) {
		const response = await axiosWithAuth.post<GetSomeProblemsResponse>(
			`${this.BASE_URL}/get/some`,
			options
		)
		return response.data
	}
}

export const problemService = new ProblemService()
