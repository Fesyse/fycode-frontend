export interface Problem {
	id: number
	title: string
	likes: number
	difficulty: Difficulty
}
export interface ExtendedProblem extends Problem {
	description: string
	creator: {
		avatar?: string
		username: string
	}
}

export enum Difficulty {
	EASY = "easy",
	MEDIUM = "medium",
	HARD = "hard"
}

export interface GetSomeProblems {
	pagination: {
		page: number
		pageSize: number
	}
	filters?: {
		difficulty?: Difficulty
	}
	orderBy?: { id?: Order; likes?: Order }
}
export interface GetSomeProblemsResponse {
	problems: Problem[]
	maxPage: number
}
export enum Order {
	ASC = "asc",
	DESC = "desc"
}
