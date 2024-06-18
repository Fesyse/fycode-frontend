import { Info } from "lucide-react"
import { type FC } from "react"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@/components/shadcn/tooltip"
import { cn } from "@/lib/utils"

type CustomTestsInfo = {
	className?: string
}

export const CustomTestsInfo: FC<CustomTestsInfo> = ({ className }) => {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={0}>
				<TooltipTrigger>
					<Info size={16} />
				</TooltipTrigger>
				<TooltipContent className={cn("max-w-96", className)}>
					<p>
						Default tests are generating random numbers, strings, string arrays
						and such.
					</p>
					<p>
						For example: argument1 = 12383 | type = number
						<br />
						argument2 = &#39;ASkhgsauAnwdhz&#39; | type = string
					</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
