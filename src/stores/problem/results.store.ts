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
		const results = JSON.parse(
			JSON.parse(
				JSON.stringify(localStorage.getItem(`problem-results-${problemId}`)) ??
					"undefined"
			) as string
		) as Results | null
		if (!results) return undefined
		console.log(results)
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
