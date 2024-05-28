import type { Test } from "@/types/test.type"
import { create } from "zustand"

export type TestsState = {
	tests: Test[]
}

export type TestsActions = {
	setTests: (tests: Test[]) => void
	addTest: (test: Test) => void
	updateTest: (value: string, selectedTestId: number, id: number) => void
	removeTests: () => void
}

export type TestsStore = TestsState & TestsActions

export const useTestsStore = create<TestsStore>(set => ({
	tests: [],
	setTests: tests => set({ tests }),
	addTest: test => set(p => ({ tests: [...p.tests, test] })),
	updateTest: (value, selectedTestId, id) =>
		/* firstly we check if selectedTestId = i (otherwise skipping it), if so changing input property to => checking if id = j (otherwise skipping it), if so changing value from input */
		set(p => ({
			tests: p.tests.map((t, i) => {
				if (i !== selectedTestId) return t
				return {
					input: t.input.map((a, j) => {
						if (id !== j) return a
						return { ...a, value }
					})
				}
			})
		})),
	removeTests: () => set({ tests: [] })
}))
