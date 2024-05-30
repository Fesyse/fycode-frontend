import { type FC } from "react"
import { toast } from "sonner"
import { Highlighter, Maximize2, RotateCcw } from "lucide-react"
import babelPlugin from "prettier/plugins/babel"
import estreePlugin from "prettier/plugins/estree"
import type { Languages } from "@/types/languages.type"
import { Button } from "@/components/shadcn/button"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@/components/shadcn/tooltip"
import { SelectLanguage } from "./select-language"
import type { ExtendedProblem } from "@/types/problem.type"
import { type EditorValueActions } from "@/stores/problem/editor.store"

export type OptionsProps = {
	problem: ExtendedProblem | undefined
	language: Languages
	setLanguage: React.Dispatch<React.SetStateAction<Languages>>
	editorValue: string
	setEditorValue: EditorValueActions["setEditorValue"]
}

export const Options: FC<OptionsProps> = ({
	problem,
	language,
	setLanguage,
	editorValue,
	setEditorValue
}) => {
	const formatCode = async () => {
		if (!problem) return
		try {
			const prettier = await import("prettier/standalone")
			const formattedCode = await prettier.format(editorValue, {
				semi: false,
				trailingComma: "none",
				tabWidth: 2,
				useTabs: true,
				singleQuote: false,
				arrowParens: "avoid",
				parser: "babel",
				plugins: [babelPlugin, estreePlugin]
			})

			setEditorValue(formattedCode, language, problem.id)
		} catch {
			toast.error(
				"An error occurred, when tried to format code. Check your code for containing errors."
			)
		}
	}
	const resetToDefaultCode = () => {
		if (!problem) return
		setEditorValue(
			`function ${problem.functionOptions.name}(${problem.functionOptions.args.map(arg => arg.name).join(", ")}) {\n\treturn\n}\n`,
			language,
			problem.id
		)
	}
	function toggleFullScreen() {
		if (!document.fullscreenElement) {
			void document.documentElement.requestFullscreen()
		} else if (document.exitFullscreen) {
			void document.exitFullscreen()
		}
	}

	return (
		<div className="flex items-center justify-between px-1.5 py-1">
			<SelectLanguage language={language} setLanguage={setLanguage} />
			<TooltipProvider delayDuration={100}>
				<div className="flex items-center gap-1">
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="smallIcon"
								onClick={() => formatCode()}
							>
								<Highlighter size={18} />
							</Button>
						</TooltipTrigger>
						<TooltipContent className="border-muted bg-editor">
							Format code
						</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="smallIcon"
								onClick={() => resetToDefaultCode()}
							>
								<RotateCcw size={18} />
							</Button>
						</TooltipTrigger>
						<TooltipContent className="border-muted bg-editor">
							Reset to default code
						</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="smallIcon"
								onClick={() => toggleFullScreen()}
							>
								<Maximize2 size={18} />
							</Button>
						</TooltipTrigger>
						<TooltipContent className="border-muted bg-editor">
							Toggle fullscreen mode
						</TooltipContent>
					</Tooltip>
				</div>
			</TooltipProvider>
		</div>
	)
}
