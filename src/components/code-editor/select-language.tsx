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
import { ChevronDown } from "lucide-react"

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
