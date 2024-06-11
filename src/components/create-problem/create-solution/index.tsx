"use client"

import { Editor, type OnMount } from "@monaco-editor/react"
import { Separator } from "@radix-ui/react-separator"
import debounce from "lodash.debounce"
import { Code } from "lucide-react"
import { type editor } from "monaco-editor"
import { useCallback, useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { Languages } from "@/types/languages.type"
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle
} from "@/components/shadcn/card"
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup
} from "@/components/shadcn/resizable"
import {
	CreateProblemOptions,
	type CreateProblemOptionsProps
} from "./create-problem-options"
import { useCreateProblemStore } from "@/stores/problem/create-problem.store"
import { useUserStore } from "@/stores/user.store"

export const CreateSolution = () => {
	const [language, setLanguage] = useState<Languages>(Languages.JAVASCRIPT)
	const [editorValue, setEditorValue] = useState("")
	const { updateProblem } = useCreateProblemStore()
	const user = useUserStore(s => s.user)
	const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)

	const handleEditorValueChange = useCallback(debounce(setEditorValue, 500), [])

	const onMount: OnMount = editor => {
		editorRef.current = editor
		editor.focus()
	}

	useEffect(() => {
		if (!user)
			return void toast.error("You must be authorized to create problem.")
		updateProblem({ solution: editorValue }, user.id)
	}, [editorValue, updateProblem, user])

	const optionsProps: CreateProblemOptionsProps = {
		language,
		setLanguage,
		editorValue,
		setEditorValue
	}
	return (
		<ResizablePanel minSize={30} defaultSize={60}>
			<ResizablePanelGroup className="gap-3" direction="vertical">
				<ResizablePanel minSize={50} defaultSize={75}>
					<Card className="relative h-full w-full overflow-hidden rounded-xl">
						<CardHeader className="sticky left-0 top-0 flex w-full flex-row items-center justify-between bg-muted py-3">
							<CardTitle className="flex items-center gap-2">
								<Code color="yellow" /> <span>Solution</span>
							</CardTitle>
						</CardHeader>
						<CardContent className="h-full bg-editor p-0">
							<CreateProblemOptions {...optionsProps} />
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
								value={editorValue}
								onMount={onMount}
								onChange={v => handleEditorValueChange(v ?? "")}
							/>
						</CardContent>
					</Card>
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel minSize={25} defaultSize={40}></ResizablePanel>
			</ResizablePanelGroup>
		</ResizablePanel>
	)
}
