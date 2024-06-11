import { type FC } from "react"
import { type Languages } from "@/types/languages.type"

export type CreateProblemOptionsProps = {
	language: Languages
	setLanguage: React.Dispatch<React.SetStateAction<Languages>>
	editorValue: string
	setEditorValue: React.Dispatch<React.SetStateAction<string>>
}

export const CreateProblemOptions: FC<CreateProblemOptionsProps> = ({}) => {
	return <div>CreateProblemOptionx</div>
}
