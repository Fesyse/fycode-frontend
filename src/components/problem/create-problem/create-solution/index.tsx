"use client"

import { Editor, type OnMount } from "@monaco-editor/react"
import debounce from "lodash.debounce"
import { Code } from "lucide-react"
import { type editor } from "monaco-editor"
import { useCallback, useEffect, useRef, useState } from "react"
import { Language } from "@/types/language.type"
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle
} from "@/components/shadcn/card"
import { ResizablePanel } from "@/components/shadcn/resizable"
import { Separator } from "@/components/shadcn/separator"
import {
	CreateProblemToolbar,
	type CreateProblemToolbarProps
} from "./create-problem-toolbar"
import { useCreateProblemStore } from "@/stores/problem/create-problem.store"
import { useUserStore } from "@/stores/user.store"

export const CreateSolution = () => {
	const [language, setLanguage] = useState<Language>(Language.JAVASCRIPT)
	const { updateProblem, getProblem, problem } = useCreateProblemStore()
	const user = useUserStore(s => s.user)
	const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)

	const setEditorValue = (editorValue: string) => {
		updateProblem({ solution: editorValue }, user?.id)
	}

	const handleEditorValueChange = useCallback(debounce(setEditorValue, 500), [
		user
	])

	const onMount: OnMount = editor => {
		editorRef.current = editor
		editor.focus()
	}

	const toolbarProps: CreateProblemToolbarProps = {
		language,
		setLanguage,
		editorValue: problem?.solution ?? ""
	}

	useEffect(() => void getProblem(user?.id), [getProblem, user?.id])
	return (
		<ResizablePanel minSize={30} defaultSize={60}>
			<Card className="relative h-full w-full overflow-hidden rounded-xl">
				<CardHeader className="sticky left-0 top-0 flex w-full flex-row items-center justify-between bg-muted py-3">
					<CardTitle className="flex items-center gap-2">
						<Code color="yellow" /> <span>Solution</span>
					</CardTitle>
				</CardHeader>
				<CardContent className="h-full bg-editor p-0">
					<CreateProblemToolbar {...toolbarProps} />
					<Separator />
					<Editor
						theme="vs-dark"
						language={language}
						options={{
							minimap: { enabled: false },
							cursorBlinking: "expand",
							cursorStyle: "line-thin",
							cursorSmoothCaretAnimation: "on",
							tabSize: 2
						}}
						value={problem.solution ?? ""}
						onMount={onMount}
						onChange={v => handleEditorValueChange(v ?? "")}
					/>
				</CardContent>
			</Card>
		</ResizablePanel>
	)
}
