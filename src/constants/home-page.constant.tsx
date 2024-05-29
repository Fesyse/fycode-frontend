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
				<LayoutDashboard /> Dashboard
			</Fragment>
		),
		description: (
			<Fragment>
				Find your favorite problems, depending on your programming skills.
				<Rocket className="ml-1 inline" />
			</Fragment>
		),
		link: "/dashboard"
	},
	{
		title: (
			<Fragment>
				<User2 /> Your profile
			</Fragment>
		),
		description: (
			<Fragment>
				See your total solved problems, and also created one's!
				<PackageCheck className="ml-1 inline" />
			</Fragment>
		),
		link: "/profile"
	},
	{
		title: (
			<Fragment>
				<Package /> Your last problem
			</Fragment>
		),
		description: (
			<Fragment>
				Go back to your last problem, that you was trying to solve.
				<ArchiveRestore className="ml-1 inline" />
			</Fragment>
		),
		link: lastUserProblemId ? `/problem/${lastUserProblemId}` : "/dashboard"
	}
]
