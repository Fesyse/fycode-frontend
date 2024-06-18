import { ChevronDown } from "lucide-react"
import { type FC } from "react"
import { Language } from "@/types/language.type"
import { Button } from "@/components/shadcn/button"
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/shadcn/dropdown-menu"
import { titleString } from "@/lib/utils"

type SelectLanguageProps = {
	setLanguage: React.Dispatch<React.SetStateAction<Language>>
	language: Language
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
					size="sm"
					className="bg-editor px-2 py-1 text-xs duration-200 hover:bg-[#181818]"
				>
					{titleString(language)}{" "}
					<ChevronDown size={18} strokeWidth={1.25} className="ml-1" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="bg-editor w-56">
				<DropdownMenuLabel>Language</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{Object.values(Language).map(lang => (
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
