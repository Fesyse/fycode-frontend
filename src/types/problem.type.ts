export interface Problem {
	id: number
	title: string
	description: string
	difficulty: Difficulty
}

export enum Difficulty {
	EASY = "easy",
	MEDIUM = "medium",
	HARD = "hard"
}
