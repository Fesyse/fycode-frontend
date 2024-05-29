import { type FC } from "react"
import type { Languages } from "@/types/languages.type"
import { SelectLanguage } from "./select-language"

type OptionsProps = {
	language: Languages
	setLanguage: React.Dispatch<React.SetStateAction<Languages>>
}

export const Options: FC<OptionsProps> = ({ language, setLanguage }) => {
	return (
		<div>
			<SelectLanguage language={language} setLanguage={setLanguage} />
		</div>
	)
}
