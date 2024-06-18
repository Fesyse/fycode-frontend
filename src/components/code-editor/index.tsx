"use client"

import { Editor, type OnMount } from "@monaco-editor/react"
import { Code } from "lucide-react"
import { type editor } from "monaco-editor"
import { type FC, useEffect, useRef, useState } from "react"
import { Language } from "@/types/language.type"
import { type ExtendedProblem } from "@/types/problem.type"
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
import { Separator } from "../shadcn/separator"
import { Options, type OptionsProps } from "./options"
import { Tabset, type TabsetProps } from "./tabset"
import { useEditorValueStore } from "@/stores/problem/editor.store"

type CodeEditorProps = {
	problem: ExtendedProblem
	defaultValue?: string
}

export const CodeEditor: FC<CodeEditorProps> = ({ problem }) => {
	const [language, setLanguage] = useState<Language>(Language.JAVASCRIPT)
	const { editorValue, getEditorValue, setEditorValue } = useEditorValueStore()
	const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)
	const [tabsetHeight, setTabsetHeight] = useState(40)

	const onMount: OnMount = editor => {
		editorRef.current = editor
		editor.focus()
	}

	const tabsetProps: TabsetProps = {
		height: tabsetHeight,
		problem
	}
	const optionsProps: OptionsProps = {
		problem,
		language,
		setLanguage,
		editorValue,
		setEditorValue
	}

	useEffect(() => {
		if (!problem) return
		localStorage.setItem("last-problem-id", problem.id.toString())
	}, [problem])

	useEffect(() => {
		const editorValueFromLocalstorage = getEditorValue(language, problem.id)
		if (editorValueFromLocalstorage.length) {
			setEditorValue(editorValueFromLocalstorage, language, problem.id)
		} else {
			setEditorValue(
				`function ${problem.functionOptions.name}(${problem.functionOptions.args.map(arg => arg.name).join(", ")}) {\n\treturn\n}\n`,
				language,
				problem.id
			)
		}
	}, [getEditorValue, language, problem, setEditorValue])
	return (
		<ResizablePanel minSize={30} defaultSize={60}>
			<ResizablePanelGroup className="gap-3" direction="vertical">
				<ResizablePanel minSize={50} defaultSize={75}>
					<Card className="relative h-full w-full overflow-hidden rounded-xl">
						<CardHeader className="sticky left-0 top-0 flex w-full flex-row items-center justify-between bg-muted py-3">
							<CardTitle className="flex items-center gap-2">
								<Code color="yellow" /> <span>Code</span>
							</CardTitle>
						</CardHeader>
						<CardContent className="h-full bg-editor p-0">
							<Options {...optionsProps} />
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
								onChange={v =>
									setEditorValue(v ?? "", language, problem?.id ?? 1)
								}
							/>
						</CardContent>
					</Card>
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel
					onResize={size => setTabsetHeight(size)}
					minSize={25}
					defaultSize={40}
				>
					<Tabset {...tabsetProps} />
				</ResizablePanel>
			</ResizablePanelGroup>
		</ResizablePanel>
	)
}
