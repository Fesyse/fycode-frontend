"use client"

import { Code } from "lucide-react"
import { useState } from "react"
import { Language } from "@/types/language.type"
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
import { Separator } from "@/components/shadcn/separator"
import { Skeleton } from "@/components/shadcn/skeleton"
import { TabsetLoading } from "../tabset/tabset-loading"
import { Toolbar, type ToolbarProps } from "./toolbar"
import { useEditorValueStore } from "@/stores/problem/editor.store"

export const CodeEditorLoading = () => {
	const [language, setLanguage] = useState<Language>(Language.JAVASCRIPT)
	const { editorValue, setEditorValue } = useEditorValueStore()

	const toolbarProps: ToolbarProps = {
		problem: undefined,
		language,
		setLanguage,
		editorValue,
		setEditorValue
	}

	return (
		<>
			{/* eslint-disable-next-line @next/next/no-head-element */}
			<head>
				<title>{`Loading... | Fycode`}</title>
			</head>
			<ResizablePanelGroup direction="vertical">
				<ResizablePanel className="pb-3" minSize={50} defaultSize={75}>
					<Card className="relative h-full w-full overflow-hidden rounded-xl">
						<CardHeader className="sticky left-0 top-0 flex w-full flex-row items-center justify-between bg-muted py-3">
							<CardTitle className="flex items-center gap-2">
								<Code color="yellow" /> <span>Code</span>
							</CardTitle>
						</CardHeader>
						<CardContent className="h-full bg-editor p-0">
							<Toolbar {...toolbarProps} />
							<Separator />
							<div className="grid grid-cols-[4rem_1fr]">
								<div className="mx-auto grid gap-1 border-r border-border text-sm">
									<span>1</span>
									<span className="opacity-50">2</span>
									<span className="opacity-50">3</span>
									<span className="opacity-50">4</span>
									<span className="opacity-50">5</span>
									<span className="opacity-50">6</span>
								</div>
								<div className="flex flex-col gap-1 pr-2">
									<Skeleton className="h-5 w-full max-w-96 bg-muted-foreground/25" />
									<Skeleton className="h-5 w-full max-w-28 bg-muted-foreground/25" />
									<Skeleton className="h-5 w-full max-w-72 bg-muted-foreground/25" />
									<Skeleton className="h-5 w-full max-w-64 bg-muted-foreground/25" />
									<Skeleton className="h-5 w-full max-w-60 bg-muted-foreground/25" />
									<Skeleton className="h-5 w-full max-w-36 bg-muted-foreground/25" />
								</div>
							</div>
						</CardContent>
					</Card>
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel className="pt-3" minSize={25} defaultSize={40}>
					<TabsetLoading />
				</ResizablePanel>
			</ResizablePanelGroup>
		</>
	)
}
