import { Rocket } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { type FC } from "react"
import { toast } from "sonner"
import {
	type AttemptFunctionProps,
	useAttemptProblem
} from "@/hooks/problem/useAttemptProblem"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { Profile } from "@/components/layout/root-layout/header/profile"
import { Button } from "@/components/shadcn/button"
import { Logo } from "@/components/ui/logo"
import { ProblemBurger } from "./problem-burger"
import { ProblemNavigation } from "./problem-navigation"
import { parseValue } from "@/lib/utils"
import { useEditorValueStore } from "@/stores/problem/editor.store"
import { useTestsStore } from "@/stores/problem/tests.store"
import { useUserStore } from "@/stores/user.store"

type HeaderProps = { problemId: number | undefined }

export const Header: FC<HeaderProps> = ({ problemId }) => {
	const router = useRouter()
	const user = useUserStore(s => s.user)
	const { tests } = useTestsStore()
	const { editorValue } = useEditorValueStore()
	const { mutate: attemptProblem } = useAttemptProblem(problemId ?? 1)
	const pathname = usePathname()
	const isCreateProblemPage = pathname.startsWith("/create-problem")

	const isMobile = useMediaQuery("(max-width: 720px)")

	const handleAttempt = async (type: "attempt" | "submit") => {
		if (!user) {
			toast.error(`You must be logged in, to ${type} problem.`)
			return router.push(`/auth?callbackUrl=/problem/${problemId}`)
		}
		try {
			const opts: AttemptFunctionProps =
				type === "attempt"
					? {
							type,
							data: {
								code: editorValue,
								tests: tests.map((test, i) => ({
									input: test.input.map(arg => {
										if (!arg.value.length) {
											toast.error(
												`At test ${i + 1} argument ${arg.name} is not provided.`
											)
											throw new Error()
										}

										return parseValue(arg.value, arg.type)
									})
								}))
							}
						}
					: { type, data: { code: editorValue } }
			attemptProblem(opts)
		} catch {}
	}

	return (
		<header className="flex justify-between gap-10 max-lg:gap-4">
			<div className="flex items-center gap-4">
				{isCreateProblemPage ? (
					<Link href="/dashboard">
						<Logo className="text-lg" />
					</Link>
				) : !isMobile ? (
					<>
						<Link href="/dashboard">
							<Logo className="text-lg" />
						</Link>
						<ProblemNavigation problemId={problemId} />
					</>
				) : (
					<ProblemBurger problemId={problemId} />
				)}
			</div>
			{isCreateProblemPage ? null : (
				<div className="flex gap-2 max-lg:gap-1">
					<Button
						onClick={() => handleAttempt("attempt")}
						size={isMobile ? "xs" : "sm"}
						variant="secondary"
						className="max-[720px]:text-xs"
					>
						Attempt
					</Button>
					<Button
						onClick={() => handleAttempt("submit")}
						size={isMobile ? "xs" : "sm"}
						className="flex gap-2 max-[720px]:gap-1 max-[720px]:text-xs"
					>
						Submit <Rocket strokeWidth={isMobile ? 1.5 : 2} />
					</Button>
				</div>
			)}
			<div
				style={{
					// change if problem navigation or burger sizes are different
					width: isMobile ? 40 : 217
				}}
				className="flex justify-end"
			>
				<Profile />
			</div>
		</header>
	)
}
