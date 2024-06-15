import { toast } from "sonner"
import { create } from "zustand"
import { type CreateProblem, Difficulty } from "@/types/problem.type"

export type CreateProblemState = {
	problem: Partial<CreateProblem>
}

export type CreateProblemActions = {
	getProblem: (userId: string | undefined) => Partial<CreateProblem>
	updateProblem: (
		problem: Partial<CreateProblem>,
		userId: string | undefined
	) => void
	setProblem: (problem: CreateProblem, userId: string | undefined) => void
}

export type CreateProblemStore = CreateProblemState & CreateProblemActions

export const useCreateProblemStore = create<CreateProblemStore>(set => ({
	problem: {
		title: "",
		description: "",
		difficulty: Difficulty.EASY,
		functionOptions: undefined,
		testsOptions: undefined,
		solution: "",
		tags: []
	},
	getProblem: userId => {
		if (!userId) return toast.error("You must be authorized to create problem.")
		const problem = JSON.parse(
			localStorage.getItem(`create-problem-${userId}`) ?? "{}"
		) as Partial<CreateProblem>
		set(state => ({ problem: { ...state.problem, ...problem } }))
		return problem
	},
	updateProblem: (problem, userId) => {
		if (!userId) return toast.error("You must be authorized to create problem.")
		set(state => {
			const updatedProblem = { ...state.problem, ...problem }
			localStorage.setItem(
				`create-problem-${userId}`,
				JSON.stringify(updatedProblem)
			)
			return { problem: updatedProblem }
		})
	},
	setProblem: (problem, userId) => {
		if (!userId) return toast.error("You must be authorized to create problem.")
		localStorage.setItem(`create-problem-${userId}`, JSON.stringify(problem))
		set({ problem })
	}
}))
