import { Rocket } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { type FC } from "react"
import { toast } from "sonner"

import { Profile } from "@/components/layout/root-layout/header/profile"
import { Button } from "@/components/shadcn/button"
import { Logo } from "@/components/ui/logo"

import {
	type AttemptFunctionProps,
	useAttemptProblem
} from "@/hooks/problem/useAttemptProblem"

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
		<header className="flex justify-between gap-10">
			<div className="flex w-64 items-center gap-4">
				<Link href="/dashboard">
					<Logo className="text-lg" />
				</Link>
				<ProblemNavigation problemId={problemId} />
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
