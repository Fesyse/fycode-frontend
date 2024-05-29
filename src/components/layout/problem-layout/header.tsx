import {
	ChevronRight,
	ChevronLeft,
	Shuffle,
	LayoutDashboard,
	Rocket
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { type FC } from "react"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@/components/shadcn/tooltip"
import { Button } from "@/components/shadcn/button"
import { Logo } from "@/components/ui/logo"
import { useProblemId } from "@/hooks/problem/useProblemId"
import { Profile } from "@/components/layout/root-layout/header/profile"
import {
	type AttemptFunctionProps,
	useAttemptProblem
} from "@/hooks/problem/useAttemptProblem"
import { useTestsStore } from "@/stores/problem/tests.store"
import { useEditorValueStore } from "@/stores/problem/editor.store"

type HeaderProps = { problemId: number | undefined }

export const Header: FC<HeaderProps> = ({ problemId }) => {
	const router = useRouter()
	const { mutateAsync: getProblemId } = useProblemId()
	const { tests } = useTestsStore()
	const { editorValue } = useEditorValueStore()
	const { mutate: attemptProblem } = useAttemptProblem(problemId ?? 1)

	const handleButtonSubmit = async (type: "next" | "prev" | "random") => {
		if (!problemId) return
		const { id } = await getProblemId({
			currentProblemId: isNaN(+problemId) ? 1 : problemId,
			type
		})
		if (id) router.push(`/problem/${id}`)
	}
	const handleAttempt = async (type: "attempt" | "submit") => {
		const opts: AttemptFunctionProps =
			type === "attempt"
				? {
						type,
						data: {
							code: editorValue,
							tests: tests.map(test => ({
								// eslint-disable-next-line @typescript-eslint/no-unsafe-return
								input: test.input.map(arg => JSON.parse(arg.value))
							}))
						}
					}
				: { type, data: { code: editorValue } }
		attemptProblem(opts)
	}

	return (
		<header className="flex justify-between gap-10">
			<div className="flex w-64 items-center gap-4">
				<Link href="/dashboard">
					<Logo className="text-lg" />
				</Link>
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
			</div>
			<div className="flex gap-2">
				<Button
					onClick={() => handleAttempt("attempt")}
					size="sm"
					variant="secondary"
				>
					Attempt
				</Button>
				<Button
					onClick={() => handleAttempt("submit")}
					size="sm"
					className="flex gap-2"
				>
					Submit <Rocket />
				</Button>
			</div>
			<div className="flex w-full max-w-64 justify-end">
				<Profile />
			</div>
		</header>
	)
}
