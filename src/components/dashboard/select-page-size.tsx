import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger
} from "@/components/shadcn/dropdown-menu"
import { Button } from "@/components/shadcn/button"
import { type FC } from "react"
import type { GetSomeProblems } from "@/types/problem.type"

type SelectPageSizeProps = {
	problemsOptions: GetSomeProblems
	setProblemsOptions: React.Dispatch<React.SetStateAction<GetSomeProblems>>
}

export const SelectPageSize: FC<SelectPageSizeProps> = ({
	setProblemsOptions,
	problemsOptions
}) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">Select page size</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuCheckboxItem
					checked={problemsOptions.pagination.pageSize === 10}
					onCheckedChange={() =>
						setProblemsOptions(prev => ({
							...prev,
							pagination: { ...prev.pagination, pageSize: 10 }
						}))
					}
				>
					10
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem
					checked={problemsOptions.pagination.pageSize === 25}
					onCheckedChange={() =>
						setProblemsOptions(prev => ({
							...prev,
							pagination: { ...prev.pagination, pageSize: 25 }
						}))
					}
				>
					25
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem
					checked={problemsOptions.pagination.pageSize === 50}
					onCheckedChange={() =>
						setProblemsOptions(prev => ({
							...prev,
							pagination: { ...prev.pagination, pageSize: 50 }
						}))
					}
				>
					50
				</DropdownMenuCheckboxItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
