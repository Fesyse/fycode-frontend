import Link from "next/link"
import { type FC } from "react"
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTrigger
} from "@/components/shadcn/sheet"
import { Logo } from "@/components/ui/logo"
import { Menu } from "@/components/ui/menu"
import { ProblemNavigation } from "./problem-navigation"

type ProblemBurgerProps = {
	problemId: number | undefined
}

export const ProblemBurger: FC<ProblemBurgerProps> = ({ problemId }) => {
	return (
		<Sheet>
			<SheetTrigger>
				<Menu size={30} />
			</SheetTrigger>
			<SheetContent side="left" className="w-48">
				<SheetHeader className="text-left">
					<Link href="/">
						<Logo className="text-3xl" />
					</Link>
					<SheetDescription>
						There you can find different problem.
					</SheetDescription>
				</SheetHeader>
				<div className="mt-2">
					<ProblemNavigation expanded problemId={problemId} />
				</div>
			</SheetContent>
		</Sheet>
	)
}
