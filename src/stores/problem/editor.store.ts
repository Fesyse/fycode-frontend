import type { Languages } from "@/types/languages.type"
import { create } from "zustand"

export type EditorValueState = {
	editorValue: string
}

export type EditorValueActions = {
	getEditorValue: (language: Languages, problemId: number) => string
	setEditorValue: (
		editorValue: string,
		language: Languages,
		problemId: number
	) => void
}

export type EditorValueStore = EditorValueState & EditorValueActions

export const useEditorValueStore = create<EditorValueStore>(set => ({
	editorValue: "",
	getEditorValue: (language, problemId) => {
		const editorValue =
			localStorage.getItem(`problem-editor-value-${language}-${problemId}`) ??
			""
		set({ editorValue })
		return editorValue
	},
	setEditorValue: (editorValue, language, problemId) => {
		localStorage.setItem(
			`problem-editor-value-${language}-${problemId}`,
			editorValue
		)
		set({ editorValue })
	}
}))
