import { Languages } from "@/types/languages.type"
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuCheckboxItem
} from "@/components/shadcn/dropdown-menu"
import { type FC } from "react"
import { Button } from "@/components/shadcn/button"
import { titleString } from "@/lib/utils"

type SelectLanguageProps = {
	setLanguage: React.Dispatch<React.SetStateAction<Languages>>
	language: Languages
}

export const SelectLanguage: FC<SelectLanguageProps> = ({
	setLanguage,
	language
}) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="secondary"
					className="bg-[#1e1e1e] duration-200 hover:bg-[#181818]"
				>
					{titleString(language)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56 bg-[#1e1e1e]">
				<DropdownMenuLabel>Language</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{Object.values(Languages).map(lang => (
					<DropdownMenuCheckboxItem
						key={lang}
						checked={language === lang}
						onCheckedChange={() => setLanguage(lang)}
					>
						Javascript
					</DropdownMenuCheckboxItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
