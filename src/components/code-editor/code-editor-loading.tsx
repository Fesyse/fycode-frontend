"use client"

import { useState } from "react"
import { Code } from "lucide-react"
import { useEditorValueStore } from "@/stores/problem/editor.store"
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
import { Separator } from "@/components/shadcn/separator"
import { Skeleton } from "@/components/shadcn/skeleton"
import { Options, type OptionsProps } from "./options"
import { TabsetLoading } from "./tabset/tabset-loading"

export const CodeEditorLoading = () => {
	const [language, setLanguage] = useState<Languages>(Languages.JAVASCRIPT)
	const { editorValue, setEditorValue } = useEditorValueStore()

	const optionsProps: OptionsProps = {
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
							<Options {...optionsProps} />
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
