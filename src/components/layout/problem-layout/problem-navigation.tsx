import {
	ChevronLeft,
	ChevronRight,
	LayoutDashboard,
	Shuffle
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { type FC } from "react"
import { useProblemId } from "@/hooks/problem/useProblemId"
import { Button } from "@/components/shadcn/button"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@/components/shadcn/tooltip"
import { cn } from "@/lib/utils"

type ProblemNavigation = {
	expanded?: boolean
	problemId: number | undefined
}

export const ProblemNavigation: FC<ProblemNavigation> = ({
	problemId,
	expanded = false
}) => {
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
		<nav
			className={cn("group flex gap-[0.125rem] overflow-hidden rounded-lg", {
				"flex-col justify-start": expanded
			})}
		>
			{expanded ? (
				<>
					<Button className="gap-2" variant="link" asChild>
						<Link href="/dashboard">
							<LayoutDashboard /> Dashboard
						</Link>
					</Button>
					<div className="flex gap-1 justify-between">
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										onClick={() => handleButtonSubmit("prev")}
										variant="ghost"
										size="icon"
									>
										<ChevronLeft />
									</Button>
								</TooltipTrigger>
								<TooltipContent>Previous problem</TooltipContent>
							</Tooltip>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										onClick={() => handleButtonSubmit("random")}
										variant="ghost"
										size="icon"
									>
										<Shuffle />
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Random problem</p>
								</TooltipContent>
							</Tooltip>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										onClick={() => handleButtonSubmit("next")}
										variant="ghost"
										size="icon"
									>
										<ChevronRight />
									</Button>
								</TooltipTrigger>
								<TooltipContent>Next problem</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
				</>
			) : (
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								asChild
								size="smallIcon"
								variant="ghost"
								className="h-8 w-8 rounded-sm p-[0.3rem] group-hover:bg-muted"
							>
								<Link href="/dashboard">
									<LayoutDashboard />
								</Link>
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Dashboard</p>
						</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
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
							<p>Previous problem</p>
						</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
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
						<TooltipTrigger asChild>
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
			)}
		</nav>
	)
}
