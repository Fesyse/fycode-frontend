import { create } from "zustand"
import type { Test } from "@/types/test.type"

export type TestsState = {
	tests: Test[]
}

export type TestsActions = {
	getTests: (problemId: number) => Test[]
	setTests: (tests: Test[], problemId: number) => void
	addTest: (test: Test, problemId: number) => void
	removeTest: (id: number, problemId: number) => void
	updateTest: (opts: UpdateTest) => void
	removeTests: (problemId: number) => void
}

export type TestsStore = TestsState & TestsActions

type UpdateTest = {
	problemId: number
	value: string
	selectedTestId: number
	id: number
}

export const useTestsStore = create<TestsStore>(set => ({
	tests: [],
	getTests: problemId => {
		const tests = JSON.parse(
			localStorage.getItem(`problem-tests-${problemId}`) ?? "[]"
		) as Test[]
		set({ tests })
		return tests
	},
	setTests: (tests, problemId) => {
		localStorage.setItem(`problem-tests-${problemId}`, JSON.stringify(tests))
		set({ tests })
	},
	addTest: (test, problemId) =>
		set(p => {
			const newTests = [...p.tests, test]
			localStorage.setItem(
				`problem-tests-${problemId}`,
				JSON.stringify(newTests)
			)
			return { tests: newTests }
		}),
	removeTest: (id, problemId) =>
		set(p => {
			const newTests = p.tests.filter((test, i) => i !== id)
			localStorage.setItem(
				`problem-tests-${problemId}`,
				JSON.stringify(newTests)
			)
			return { tests: newTests }
		}),
	updateTest: opts => {
		/* firstly we check if selectedTestId = i (otherwise skipping it), if so changing input property to => checking if id = j (otherwise skipping it), if so changing value from input */
		set(p => {
			const newTests = p.tests.map((t, i) => {
				if (i !== opts.selectedTestId) return t
				return {
					input: t.input.map((a, j) => {
						if (opts.id !== j) return a
						return { ...a, value: opts.value }
					})
				}
			})
			localStorage.setItem(
				`problem-tests-${opts.problemId}`,
				JSON.stringify(newTests)
			)
			return {
				tests: newTests
			}
		})
	},
	removeTests: problemId => {
		localStorage.removeItem(`problem-tests-${problemId}`)
		set({ tests: [] })
	}
}))
