import { Rocket } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { type FC, useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import {
	type AttemptFunctionProps,
	useAttemptProblem
} from "@/hooks/problem/useAttemptProblem"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { Profile } from "@/components/layout/root-layout/header/profile"
import { Button } from "@/components/shadcn/button"
import { Logo } from "@/components/ui/logo"
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

	const [profileWidth, setProfileWidth] = useState<number>(217)
	const isMobile = useMediaQuery("(max-width: 720px)")
	const logoWrapperRef = useRef<HTMLDivElement | null>(null)

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

	useEffect(() => {
		if (!logoWrapperRef.current) return
		console.log(logoWrapperRef.current.offsetWidth)
		setProfileWidth(logoWrapperRef.current.offsetWidth)
	}, [logoWrapperRef.current?.offsetWidth])

	return (
		<header className="flex justify-between gap-10 max-lg:gap-4">
			<div ref={logoWrapperRef} className="flex items-center gap-4">
				<Link href="/dashboard">
					<Logo className="text-lg" />
				</Link>
				{!isMobile ? <ProblemNavigation problemId={problemId} /> : null}
			</div>
			<div className="flex gap-2 max-lg:gap-1">
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
			<div className="flex justify-end">
				<Profile />
			</div>
		</header>
	)
}
