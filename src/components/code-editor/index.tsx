"use client"

import { useRef, useState, type FC } from "react"
import { Editor, type OnMount } from "@monaco-editor/react"
import { type editor } from "monaco-editor"
import { Card, CardContent, CardHeader } from "@/components/shadcn/card"

type CodeEditorProps = {
	defaultValue?: string
}

export const CodeEditor: FC<CodeEditorProps> = () => {
	const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)
	const [value, setValue] = useState("const solution = () => {}")

	const onMount: OnMount = editor => {
		editorRef.current = editor
		editor.focus()
	}

	return (
		<Card className="h-full w-full overflow-hidden rounded-3xl">
			<CardHeader className="bg-muted">asd</CardHeader>
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
			</CardContent>
		</Card>
	)
}
