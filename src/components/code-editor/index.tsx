"use client"

import { useRef, useState, type FC } from "react"
import { BugPlay, Code, TestTube } from "lucide-react"
import { Editor, type OnMount } from "@monaco-editor/react"
import { type editor } from "monaco-editor"
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
import { Button } from "@/components/shadcn/button"
import { Tests } from "./tests"
import { Results } from "./results"
import SelectLanguage from "./select-language"
import { AnimatePresence, motion, type MotionProps } from "framer-motion"

type CodeEditorProps = {
	defaultValue?: string
}

export const CodeEditor: FC<CodeEditorProps> = () => {
	const [value, setValue] = useState("const solution = () => {}")
	const [language, setLanguage] = useState<Languages>(Languages.JAVASCRIPT)
	const [tab, setTab] = useState<"tests" | "results">("tests")

	const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)

	const onMount: OnMount = editor => {
		editorRef.current = editor
		editor.focus()
	}

	const motionSectionProps: MotionProps = {
		transition: {
			duration: 0.25
		},
		initial: {
			opacity: 0,
			filter: "blur(4px)",
			position: "absolute"
		},
		animate: {
			opacity: 1,
			filter: "blur(0px)",
			position: "relative"
		},
		exit: {
			opacity: 0,
			filter: "blur(4px)",
			position: "absolute"
		}
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
					<CardContent className="h-full bg-[#1e1e1e] px-0 py-2">
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
					<CardHeader className="bg-muted py-3">
						<div className="flex gap-2 text-muted-foreground">
							<Button
								onClick={() => setTab("tests")}
								className="flex items-center bg-[#1e1e1e] pl-2.5 pr-4  text-foreground hover:bg-[#181818]"
							>
								<TestTube color="green" />
								Tests
							</Button>
							<Button
								onClick={() => setTab("results")}
								className="flex items-center gap-1 bg-[#1e1e1e] px-2.5 text-foreground hover:bg-[#181818]"
							>
								<BugPlay color="green" />
								Results
							</Button>
						</div>
					</CardHeader>
					<CardContent className="h-full bg-[#1e1e1e] py-2">
						<AnimatePresence>
							{tab === "tests" ? (
								<motion.section key="tests" {...motionSectionProps}>
									<Tests />
								</motion.section>
							) : (
								<motion.section key="results" {...motionSectionProps}>
									<Results />
								</motion.section>
							)}
						</AnimatePresence>
					</CardContent>
				</Card>
			</ResizablePanel>
		</ResizablePanelGroup>
	)
}
