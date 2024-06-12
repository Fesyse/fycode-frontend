import { Info } from "lucide-react"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@/components/shadcn/tooltip"

export const CustomTestsInfo = () => {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={0}>
				<TooltipTrigger>
					<Info size={16} />
				</TooltipTrigger>
				<TooltipContent className="max-w-96">
					<p>
						Default tests are generating random numbers, strings, string arrays
						and such.
					</p>
					<p>
						For example: argument1 = 12383 | type = number
						<span className="block">
							argument2 = &#39;ASkhgsauAnwdhz&#39; | type = string
						</span>
					</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
