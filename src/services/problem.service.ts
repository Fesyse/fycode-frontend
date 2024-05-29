import { axiosWithAuth } from "@/api/interceptors"
import type {
	AttemptProblem,
	ExtendedProblem,
	GetSomeProblems,
	GetSomeProblemsResponse,
	SubmitProblem
} from "@/types/problem.type"
import type { Results } from "@/types/test.type"

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

	async like(problemId: number, undo: boolean) {
		const response = await axiosWithAuth.post<number>(
			`${this.BASE_URL}/like/${problemId}?undo=${undo}`
		)
		return response.data
	}
	async dislike(problemId: number, undo: boolean) {
		const response = await axiosWithAuth.post<number>(
			`${this.BASE_URL}/dislike/${problemId}?undo=${undo}`
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

	async attempt(problemId: number, data: AttemptProblem) {
		const response = await axiosWithAuth.post<Results>(
			`${this.BASE_URL}/attempt/${problemId}`,
			data
		)
		return response.data
	}
	async submit(problemId: number, data: SubmitProblem) {
		const response = await axiosWithAuth.post<Results>(
			`${this.BASE_URL}/submit/${problemId}`,
			data
		)
		return response.data
	}
}

export const problemService = new ProblemService()
