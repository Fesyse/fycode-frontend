import { type z } from "zod"
import { create } from "zustand"
import { type editorOptionsSchema } from "@/lib/schemas"

export type EditorOptions = z.infer<typeof editorOptionsSchema>

export type EditorOptionsState = {
	editorOptions: EditorOptions
}

export type EditorOptionsActions = {
	getEditorOptions: (userId: string | undefined) => EditorOptions
	updateEditorOptions: (
		editorOptions: Partial<EditorOptions>,
		userId: string | undefined
	) => void
	setEditorOptions: (
		editorOptions: EditorOptions,
		userId: string | undefined
	) => void
}

export type EditorOptionsStore = EditorOptionsState & EditorOptionsActions

const defaultEditorOptions: EditorOptions = {
	fontSize: 12,
	tabSize: 2,
	minimap: { enabled: false },
	cursorBlinking: "expand",
	cursorStyle: "line-thin",
	cursorSmoothCaretAnimation: "on"
}

export const useEditorOptionsStore = create<EditorOptionsStore>(set => ({
	editorOptions: defaultEditorOptions,
	getEditorOptions: userId => {
		const editorOptions = JSON.parse(
			localStorage.getItem(`editor-options-${userId ?? "guest"}`) ??
				JSON.stringify(defaultEditorOptions)
		) as EditorOptions
		set({ editorOptions })
		return editorOptions
	},
	updateEditorOptions: (editorOptions, userId) => {
		set(prev => {
			const newEditorOptions = { ...prev.editorOptions, ...editorOptions }
			localStorage.setItem(
				`editor-options-${userId ?? "guest"}`,
				JSON.stringify(newEditorOptions)
			)
			return { editorOptions: newEditorOptions }
		})
	},
	setEditorOptions: (editorOptions, userId) => {
		localStorage.setItem(
			`editor-options-${userId ?? "guest"}`,
			JSON.stringify(editorOptions)
		)
		set({ editorOptions })
	}
}))
