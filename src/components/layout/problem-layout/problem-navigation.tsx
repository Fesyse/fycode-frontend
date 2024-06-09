import {
	ChevronLeft,
	ChevronRight,
	LayoutDashboard,
	Shuffle
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { type FC } from "react"

import { Button } from "@/components/shadcn/button"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@/components/shadcn/tooltip"

import { useProblemId } from "@/hooks/problem/useProblemId"

type ProblemNavigation = {
	problemId: number | undefined
}

export const ProblemNavigation: FC<ProblemNavigation> = ({ problemId }) => {
	const router = useRouter()
	const { mutateAsync: getProblemId } = useProblemId()
	const handleButtonSubmit = async (type: "next" | "prev" | "random") => {
		if (!problemId) return
		const { id } = await getProblemId({
			currentProblemId: isNaN(+problemId) ? 1 : problemId,
			type
		})
		if (id) router.push(`/problem/${id}`)
	}

	return (
		<div className="group flex gap-[0.125rem] overflow-hidden rounded-lg">
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>
						<Link href="/dashboard">
							<Button
								size="smallIcon"
								variant="ghost"
								className="h-8 w-8 rounded-sm p-[0.3rem] group-hover:bg-muted"
							>
								<LayoutDashboard />
							</Button>
						</Link>
					</TooltipTrigger>
					<TooltipContent>
						<p>Dashboard</p>
					</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger>
						<Button
							size="smallIcon"
							onClick={() => handleButtonSubmit("prev")}
							variant="ghost"
							className="h-8 w-8 rounded-sm p-[0.3rem] group-hover:bg-muted"
						>
							<ChevronLeft />
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>Next problem</p>
					</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger>
						<Button
							size="smallIcon"
							onClick={() => handleButtonSubmit("next")}
							variant="ghost"
							className="h-8 w-8 rounded-sm p-[0.3rem] group-hover:bg-muted"
						>
							<ChevronRight />
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>Previous problem</p>
					</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger>
						<Button
							size="smallIcon"
							onClick={() => handleButtonSubmit("random")}
							variant="ghost"
							className="h-8 w-8 rounded-sm p-[0.3rem] group-hover:bg-muted"
						>
							<Shuffle />
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>Random problem</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	)
}
