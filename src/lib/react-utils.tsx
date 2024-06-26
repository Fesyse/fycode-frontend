import { type ColumnDef } from "@tanstack/react-table"
import type { MotionProps } from "framer-motion"
import { ArrowUpDown } from "lucide-react"
import {
	Difficulty,
	type GetSomeProblems,
	Order,
	type Problem
} from "@/types/problem.type"
import { Button } from "@/components/shadcn/button"
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/shadcn/dropdown-menu"
import { titleString } from "./utils"

type GetColumns = ({
	problemsOptions,
	setProblemsOptions
}: {
	problemsOptions: GetSomeProblems
	setProblemsOptions: React.Dispatch<React.SetStateAction<GetSomeProblems>>
}) => ColumnDef<Problem>[]

export const getColumns: GetColumns = ({
	problemsOptions,
	setProblemsOptions
}) => [
	{
		accessorKey: "id",
		header: () => (
			<Button
				className="-mx-2 px-3"
				variant="ghost"
				onClick={() =>
					setProblemsOptions(prev => ({
						...prev,
						orderBy: {
							id: prev.orderBy?.id === Order.DESC ? Order.ASC : Order.DESC
						}
					}))
				}
			>
				ID
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => <span>{row.getValue("id")}</span>
	},
	{
		accessorKey: "title",
		header: "Title",
		cell: ({ row }) => <span className="w-full">{row.getValue("title")}</span>
	},
	{
		accessorKey: "likes",
		header: () => (
			<Button
				className="-mx-2 px-3"
				variant="ghost"
				onClick={() =>
					setProblemsOptions(prev => ({
						...prev,
						orderBy: {
							likes: prev.orderBy?.likes === Order.DESC ? Order.ASC : Order.DESC
						}
					}))
				}
			>
				Likes
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => <span>{row.getValue("likes")}</span>
	},
	{
		accessorKey: "difficulty",
		header: () => (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button className="-mx-2 px-3" variant="ghost">
						Difficulty
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuCheckboxItem
						checked={problemsOptions.filters?.difficulty === Difficulty.EASY}
						onCheckedChange={() =>
							setProblemsOptions(prev => ({
								...prev,
								filters: { ...prev.filters, difficulty: Difficulty.EASY }
							}))
						}
					>
						Easy
					</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem
						checked={problemsOptions.filters?.difficulty === Difficulty.MEDIUM}
						onCheckedChange={() =>
							setProblemsOptions(prev => ({
								...prev,
								filters: { ...prev.filters, difficulty: Difficulty.MEDIUM }
							}))
						}
					>
						Medium
					</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem
						checked={problemsOptions.filters?.difficulty === Difficulty.HARD}
						onCheckedChange={() =>
							setProblemsOptions(prev => ({
								...prev,
								filters: { ...prev.filters, difficulty: Difficulty.HARD }
							}))
						}
					>
						Hard
					</DropdownMenuCheckboxItem>
					<DropdownMenuSeparator />
					<Button
						className="w-full"
						variant="secondary"
						onClick={() =>
							setProblemsOptions(prev => ({
								...prev,
								filters: { ...prev.filters, difficulty: undefined }
							}))
						}
					>
						Reset
					</Button>
				</DropdownMenuContent>
			</DropdownMenu>
		),
		cell: ({ row }) => (
			<div className="text-right font-medium">
				{titleString(row.getValue("difficulty"))}
			</div>
		)
	}
]

export const opacityTransitionProps: MotionProps = {
	transition: {
		duration: 0.25
	},
	initial: {
		opacity: 0,
		filter: "blur(4px)",
		position: "absolute"
	},
	animate: {
		opacity: 1,
		filter: "blur(0px)",
		position: "relative"
	},
	exit: {
		opacity: 0,
		filter: "blur(4px)",
		position: "absolute"
	}
}
