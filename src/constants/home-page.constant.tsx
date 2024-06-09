/* eslint-disable react/no-unescaped-entities */
import {
	ArchiveRestore,
	LayoutDashboard,
	Package,
	PackageCheck,
	Rocket,
	User2
} from "lucide-react"
import { Fragment } from "react"

export interface HomePageCardRoute {
	title: React.ReactNode
	description: React.ReactNode
	link: string
}

const lastUserProblemId: string | null =
	typeof window !== "undefined" ? localStorage.getItem("last-problem-id") : null

export const HOME_PAGE_CARD_ROUTES: HomePageCardRoute[] = [
	{
		title: (
			<Fragment>
				<LayoutDashboard className="max-[1120px]:h-5 max-[1120px]:w-5" />
				Dashboard
			</Fragment>
		),
		description: (
			<Fragment>
				Find your favorite problems, depending on your programming skills.
				<Rocket className="ml-1 inline max-[1120px]:h-5 max-[1120px]:w-5" />
			</Fragment>
		),
		link: "/dashboard"
	},
	{
		title: (
			<Fragment>
				<User2 className="max-[1120px]:h-5 max-[1120px]:w-5" /> Your profile
			</Fragment>
		),
		description: (
			<Fragment>
				See your total solved problems, and also created one's!
				<PackageCheck className="ml-1 inline max-[1120px]:h-5 max-[1120px]:w-5" />
			</Fragment>
		),
		link: "/profile"
	},
	{
		title: (
			<Fragment>
				<Package className="max-[1120px]:h-5 max-[1120px]:w-5" /> Your last
				problem
			</Fragment>
		),
		description: (
			<Fragment>
				Go back to your last problem, that you was trying to solve.
				<ArchiveRestore className="ml-1 inline max-[1120px]:h-5 max-[1120px]:w-5" />
			</Fragment>
		),
		link: lastUserProblemId ? `/problem/${lastUserProblemId}` : "/dashboard"
	}
]
