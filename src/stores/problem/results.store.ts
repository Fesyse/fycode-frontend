import { create } from "zustand"
import type { Results } from "@/types/test.type"

export type ResultsState = {
	results: Results | undefined
	error: string | undefined
	tab: "tests" | "results"
}

export type ResultsActions = {
	setTab: (tab: ResultsState["tab"]) => void
	getResults: (problemId: number) => Results | undefined
	setResults: (results: Results, problemId: number) => void
	setError: (message: string) => void
	removeError: () => void
}

export type ResultsStore = ResultsState & ResultsActions

export const useResultsStore = create<ResultsStore>(set => ({
	results: undefined,
	error: undefined,
	tab: "tests",
	setTab: tab => set({ tab }),
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
