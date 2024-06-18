import { Highlighter, Maximize2, RotateCcw } from "lucide-react"
import babelPlugin from "prettier/plugins/babel"
import estreePlugin from "prettier/plugins/estree"
import { type FC } from "react"
import { toast } from "sonner"
import { type Language } from "@/types/language.type"
import { SelectLanguage } from "@/components/problem/code-editor/select-language"
import { Button } from "@/components/shadcn/button"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@/components/shadcn/tooltip"
import { useCreateProblemStore } from "@/stores/problem/create-problem.store"
import { useUserStore } from "@/stores/user.store"

export type CreateProblemOptionsProps = {
	language: Language
	setLanguage: React.Dispatch<React.SetStateAction<Language>>
	editorValue: string
}

export const CreateProblemOptions: FC<CreateProblemOptionsProps> = ({
	language,
	setLanguage
}) => {
	const { problem, updateProblem } = useCreateProblemStore()
	const user = useUserStore(s => s.user)

	const formatCode = async () => {
		try {
			const prettier = await import("prettier/standalone")
			const formattedCode = await prettier.format(problem?.solution ?? "", {
				semi: false,
				trailingComma: "none",
				tabWidth: 2,
				useTabs: true,
				singleQuote: false,
				arrowParens: "avoid",
				parser: "babel",
				plugins: [babelPlugin, estreePlugin]
			})

			updateProblem({ solution: formattedCode }, user?.id)
		} catch {
			toast.error(
				"An error occurred, when tried to format code. Check your code for containing errors."
			)
		}
	}
	const resetEditor = () => {
		updateProblem({ solution: "" }, user?.id)
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
								onClick={() => resetEditor()}
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
