import { axiosWithAuth } from "@/api/interceptors"
import type {
	ExtendedProblem,
	GetSomeProblems,
	GetSomeProblemsResponse
} from "@/types/problem.type"

class ProblemService {
	private BASE_URL = `/problem`

	async getById(id: number | string, userId: string | undefined) {
		const response = await axiosWithAuth.get<ExtendedProblem>(
			`${this.BASE_URL}/${id}?userId=${userId}`
		)
		return response.data
	}

	async getPage(options: GetSomeProblems) {
		const response = await axiosWithAuth.post<GetSomeProblemsResponse>(
			`${this.BASE_URL}/get/page`,
			options
		)
		return response.data
	}

	async like(problemId: number) {
		const response = await axiosWithAuth.post<number>(
			`${this.BASE_URL}/like/${problemId}`
		)
		return response.data
	}
	async dislike(problemId: number) {
		const response = await axiosWithAuth.post<number>(
			`${this.BASE_URL}/dislike/${problemId}`
		)
		return response.data
	}

	async getNextProblemId(currentProblemId: number) {
		const response = await axiosWithAuth.get<{ id: number }>(
			`${this.BASE_URL}/get/next?fromProblemId=${currentProblemId}`
		)
		return response.data
	}
	async getPrevProblemId(currentProblemId: number) {
		const response = await axiosWithAuth.get<{ id: number }>(
			`${this.BASE_URL}/get/prev?fromProblemId=${currentProblemId}`
		)
		return response.data
	}
	async getRandomProblemId() {
		const response = await axiosWithAuth.get<{ id: number }>(
			`${this.BASE_URL}/get/random`
		)
		return response.data
	}
}

export const problemService = new ProblemService()
