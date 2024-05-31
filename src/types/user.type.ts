import type { Problem } from "./problem.type"

export interface User {
	id: string
	username: string
	email: string
	createdAt: string
	updatedAt: string
	avatar?: string
}

export interface Profile extends User {
	createdProblems: Omit<Problem, "difficulty">[]
	solvedProblems: Omit<Problem, "difficulty">[]
	problemsCount: number
}
