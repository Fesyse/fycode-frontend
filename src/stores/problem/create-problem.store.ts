import { create } from "zustand"
import { type CreateProblem } from "@/types/problem.type"

export type CreateProblemState = {
	problem: Partial<CreateProblem>
}

export type CreateProblemActions = {
	getProblem: (userId: string) => Partial<CreateProblem>
	updateProblem: (problem: Partial<CreateProblem>, userId: string) => void
	setProblem: (problem: CreateProblem, userId: string) => void
}

export type CreateProblemStore = CreateProblemState & CreateProblemActions

export const useCreateProblemStore = create<CreateProblemStore>(set => ({
	problem: {},
	getProblem: userId => {
		const problem = JSON.parse(
			localStorage.getItem(`create-problem-${userId}`) ?? "{}"
		) as Partial<CreateProblem>
		set({ problem })
		return problem
	},
	updateProblem: (problem, userId) => {
		set(state => {
			const updatedProblem = { ...state, ...problem }
			localStorage.setItem(
				`create-problem-${userId}`,
				JSON.stringify(updatedProblem)
			)
			return { problem: updatedProblem }
		})
	},
	setProblem: (problem, userId) => {
		localStorage.setItem(`create-problem-${userId}`, JSON.stringify(problem))
		set({ problem })
	}
}))
