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
}

export interface ProblemsCount {
	problems: number
	easyProblems: number
	mediumProblems: number
	hardProblems: number
	userProblems: number
	userEasyProblems: number
	userMediumProblems: number
	userHardProblems: number
}
