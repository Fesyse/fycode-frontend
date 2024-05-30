import type { Results } from "@/types/test.type"
import { create } from "zustand"

export type ResultsState = {
	results: Results | undefined
	error: string | undefined
}

export type ResultsActions = {
	getResults: (problemId: number) => Results | undefined
	setResults: (results: Results, problemId: number) => void
	setError: (message: string) => void
	removeError: () => void
}

export type ResultsStore = ResultsState & ResultsActions

export const useResultsStore = create<ResultsStore>(set => ({
	results: undefined,
	error: undefined,
	getResults: problemId => {
		const resultsFromStorage = localStorage.getItem(
			`problem-results-${problemId}`
		)
		const results = JSON.parse(
			resultsFromStorage === "undefined" || !resultsFromStorage
				? "null"
				: resultsFromStorage
		) as Results | null

		if (!results) return undefined
		set({ results })
		return results
	},
	setResults: (results, problemId) => {
		localStorage.setItem(
			`problem-results-${problemId}`,
			JSON.stringify(results)
		)

		set({ results })
	},
	setError: message => set({ error: message }),
	removeError: () => set({ error: undefined })
}))
