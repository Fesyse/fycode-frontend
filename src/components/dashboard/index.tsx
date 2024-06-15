"use client"

import {
	flexRender,
	getCoreRowModel,
	useReactTable
} from "@tanstack/react-table"
import debounce from "lodash.debounce"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"
import type { GetSomeProblems } from "@/types/problem.type"
import { useProblems } from "@/hooks/problem/useProblems"
import { Input } from "@/components/shadcn/input"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from "@/components/shadcn/table"
import { Pagination } from "./pagination"
import { SelectPageSize } from "./select-page-size"
import { SkeletonTable } from "./skeleton-table"
import { getColumns } from "@/lib/react-utils"

export const Dashboard = () => {
	const searchParams = useSearchParams()
	const router = useRouter()
	const defaultProblemOptions: GetSomeProblems = {
		pagination: {
			page: parseInt(searchParams.get("page") ?? "0"),
			pageSize: 10
		}
	}

	const [problemsOptions, setProblemsOptions] = useState<GetSomeProblems>(
		defaultProblemOptions
	)
	const { data, refetch, isLoading, isRefetching } =
		useProblems(problemsOptions)

	const columns = useMemo(
		() => getColumns({ problemsOptions, setProblemsOptions }),
		[problemsOptions]
	)

	const table = useReactTable({
		// eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
		data: data?.problems!,
		rowCount: 10,
		columns,
		getCoreRowModel: getCoreRowModel()
	})

	const setTitleFilter = (title: string) =>
		setProblemsOptions(prev => ({
			...prev,
			filters: { ...prev.filters, title }
		}))

	const handleTitleFilterInput = useCallback(debounce(setTitleFilter, 250), [])

	useEffect(
		() =>
			setProblemsOptions(prev => ({
				...prev,
				pagination: {
					...prev.pagination,
					page: parseInt(searchParams.get("page") ?? "0")
				}
			})),
		[searchParams]
	)
	useEffect(() => void refetch(), [problemsOptions, refetch])

	return (
		<main className="flex w-full max-w-[1000px] flex-col gap-2">
			<div className="flex gap-2">
				<Input
					// @ts-expect-error react types is so damn good, that input element dont have value property
					onInput={e => handleTitleFilterInput(e.target.value as string)}
					placeholder="Find problems..."
					className="w-full"
				/>
				<SelectPageSize
					problemsOptions={problemsOptions}
					setProblemsOptions={setProblemsOptions}
				/>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map(header => (
									<TableHead
										className={
											header.id === "difficulty"
												? "flex w-full items-center justify-end"
												: undefined
										}
										key={header.id}
									>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext()
												)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody suppressHydrationWarning>
						{!table.getRowModel().rows?.length ? (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						) : isLoading || isRefetching ? (
							<SkeletonTable />
						) : (
							table.getRowModel().rows.map(row => (
								<TableRow
									// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
									onClick={() => router.push(`/problem/${row.getValue("id")}`)}
									className="cursor-pointer"
									key={row.id}
								>
									{row.getAllCells().map(cell => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>
			<Pagination
				maxPage={data?.maxPage}
				page={problemsOptions.pagination.page}
			/>
		</main>
	)
}
