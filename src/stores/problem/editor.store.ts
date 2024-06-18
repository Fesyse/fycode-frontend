import { create } from "zustand"
import type { Language } from "@/types/language.type"

export type EditorValueState = {
	editorValue: string
}

export type EditorValueActions = {
	getEditorValue: (language: Language, problemId: number) => string
	setEditorValue: (
		editorValue: string,
		language: Language,
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
