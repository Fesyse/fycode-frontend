"use client"

import { useRef, useState, type FC } from "react"
import { Editor, type OnMount } from "@monaco-editor/react"
import { type editor } from "monaco-editor"
import { Card, CardContent, CardHeader } from "@/components/shadcn/card"
import SelectLanguage from "./select-language"
import { Languages } from "@/types/languages.type"
import { Code } from "lucide-react"
import { Results } from "./results"

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
		<Card className="h-full w-full overflow-hidden rounded-3xl">
			<CardHeader className="flex flex-row items-center justify-between bg-muted py-3.5">
				<div className="flex items-center gap-2">
					<Code color="yellow" /> <span className="-mb-0.5">Code</span>
				</div>
				<SelectLanguage language={language} setLanguage={setLanguage} />
			</CardHeader>
			<CardContent className="h-full p-0">
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
				<Results />
			</CardContent>
		</Card>
	)
}
