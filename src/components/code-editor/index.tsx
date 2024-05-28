"use client"

import { useEffect, useRef, useState, type FC } from "react"
import { BugPlay, Code, TestTube } from "lucide-react"
import { AnimatePresence, motion, type MotionProps } from "framer-motion"
import { Editor, type OnMount } from "@monaco-editor/react"
import { type editor } from "monaco-editor"
import { useParams } from "next/navigation"
import { Languages } from "@/types/languages.type"
import { useProblem } from "@/hooks/problem/useProblem"
import { Tests } from "./tests"
import { Results } from "./results"
import SelectLanguage from "./select-language"
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
import { ScrollArea } from "@/components/shadcn/scroll-area"

type CodeEditorProps = {
	defaultValue?: string
}

export const CodeEditor: FC<CodeEditorProps> = () => {
	const { id } = useParams<{ id: string }>()
	const { data: problem } = useProblem(id)

	const [language, setLanguage] = useState<Languages>(Languages.JAVASCRIPT)
	const [value, setValue] = useState("Loading...")
	const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)

	const [tab, setTab] = useState<"tests" | "results">("tests")
	const [testsHeight, setTestsHeight] = useState(25)

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

	useEffect(() => {
		if (!problem) return
		setValue(
			`function ${problem.functionOptions.name} (${problem.functionOptions.args.map(arg => arg.name).join(", ")}) {\n\treturn\n}`
		)
	}, [problem])
	return (
		<ResizablePanelGroup direction="vertical">
			<ResizablePanel className="pb-4" minSize={50} defaultSize={75}>
				<Card className="relative h-full w-full overflow-hidden rounded-2xl">
					<CardHeader className="sticky left-0 top-0 flex w-full flex-row items-center justify-between bg-muted py-2">
						<CardTitle className="flex items-center gap-2">
							<Code color="yellow" /> <span>Code</span>
						</CardTitle>
						<SelectLanguage language={language} setLanguage={setLanguage} />
					</CardHeader>
					<CardContent className="h-full bg-[#1e1e1e] px-0 pt-[1.875rem]">
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
			<ResizablePanel
				onResize={size => setTestsHeight(size)}
				className="pt-4"
				minSize={25}
				defaultSize={25}
			>
				<Card className="relative h-full w-full overflow-hidden rounded-2xl bg-[#1e1e1e]">
					<CardHeader className="bg-muted py-3">
						<div className="flex gap-2 text-muted-foreground">
							<Button
								onClick={() => setTab("tests")}
								className="flex items-center bg-[#1e1e1e] pl-2.5 pr-4 text-foreground hover:bg-[#181818]"
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
					<CardContent className="bg-[#1e1e1e] px-0 py-3">
						<AnimatePresence>
							<ScrollArea
								style={{
									height: `calc(${testsHeight}vh - 7.25rem)`
								}}
								scrollbarClassName="mr-1"
								className="flex items-center gap-4 px-6"
							>
								{tab === "tests" ? (
									<motion.section key="tests" {...motionSectionProps}>
										<Tests problem={problem} />
									</motion.section>
								) : (
									<motion.section key="results" {...motionSectionProps}>
										<Results />
									</motion.section>
								)}
							</ScrollArea>
						</AnimatePresence>
					</CardContent>
				</Card>
			</ResizablePanel>
		</ResizablePanelGroup>
	)
}
