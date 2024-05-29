import type { Results } from "@/types/test.type"
import { create } from "zustand"

export type ResultsState = {
	results: Results | undefined
}

export type ResultsActions = {
	getResults: (problemId: number) => Results | undefined
	setResults: (results: Results, problemId: number) => void
}

export type ResultsStore = ResultsState & ResultsActions

export const useResultsStore = create<ResultsStore>(set => ({
	results: undefined,
	getResults: problemId => {
		const results = JSON.parse(
			localStorage.getItem(`problem-results-${problemId}`) ?? "undefined"
		) as Results | undefined
		set({ results })
		return results
	},
	setResults: (results, problemId) => {
		localStorage.setItem(
			`problem-results-${problemId}`,
			JSON.stringify(results)
		)
		set({ results })
	}
}))
