"use client"

import { useRef, useState, type FC } from "react"
import { Editor, type OnMount } from "@monaco-editor/react"
import { type editor } from "monaco-editor"
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle
} from "@/components/shadcn/card"
import SelectLanguage from "./select-language"
import { Languages } from "@/types/languages.type"
import { BugPlay, Code } from "lucide-react"
import { Results } from "./results"
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup
} from "@/components/shadcn/resizable"

type CodeEditorProps = {
	defaultValue?: string
}

export const CodeEditor: FC<CodeEditorProps> = () => {
	const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)
	const [value, setValue] = useState("const solution = () => {}")
	const [language, setLanguage] = useState<Languages>(Languages.JAVASCRIPT)

	const onMount: OnMount = editor => {
		editorRef.current = editor
		editor.focus()
	}

	return (
		<ResizablePanelGroup direction="vertical">
			<ResizablePanel className="pb-4" minSize={50} defaultSize={75}>
				<Card className="h-full w-full overflow-hidden rounded-2xl">
					<CardHeader className="flex flex-row items-center justify-between bg-muted py-[0.325rem]">
						<CardTitle className="flex items-center gap-2">
							<Code color="yellow" /> <span>Code</span>
						</CardTitle>
						<SelectLanguage language={language} setLanguage={setLanguage} />
					</CardHeader>
					<CardContent className="h-full bg-[#1e1e1e] p-0">
						<Editor
							theme="vs-dark"
							language="javascript"
							options={{
								minimap: { enabled: false }
							}}
							value={value}
							onMount={onMount}
							onChange={v => setValue(v ?? "")}
						/>
					</CardContent>
				</Card>
			</ResizablePanel>
			<ResizableHandle withHandle />
			<ResizablePanel className="pt-4" minSize={25} defaultSize={25}>
				<Card className="h-full w-full overflow-hidden rounded-2xl">
					<CardHeader className="flex flex-row gap-2 bg-muted py-3">
						<CardTitle className="flex items-center gap-2">
							<BugPlay color="green" />
							Results
						</CardTitle>
					</CardHeader>
					<CardContent className="h-full bg-[#1e1e1e]">
						<Results />
					</CardContent>
				</Card>
			</ResizablePanel>
		</ResizablePanelGroup>
	)
}
