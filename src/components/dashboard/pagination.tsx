import { type FC } from "react"
import {
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
	Pagination as _Pagination
} from "../shadcn/pagination"
import { cn } from "@/lib/utils"

type PaginationProps = {
	page: number
	maxPage?: number
}

export const Pagination: FC<PaginationProps> = ({
	page,
	maxPage: _maxPage
}) => {
	const maxPage = _maxPage ?? 10
	const getPageLink = (page: number) => `/dashboard?page=${page}`

	return (
		<_Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						href={page < 1 ? "" : getPageLink(page - 1)}
						className={cn({
							"text-foreground/50": page < 1
						})}
					/>
				</PaginationItem>
				{page > 0 ? (
					<PaginationItem>
						<PaginationLink href={getPageLink(page - 1)}>{page}</PaginationLink>
					</PaginationItem>
				) : null}
				<PaginationItem>
					<PaginationLink href={getPageLink(page)} isActive>
						{page + 1}
					</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink
						href={page >= maxPage ? "" : getPageLink(page + 1)}
						className={cn({
							"text-foreground/50": page >= maxPage
						})}
					>
						{page + 2}
					</PaginationLink>
				</PaginationItem>
				<PaginationItem
					className={cn({
						"text-foreground/50": page > maxPage - 2
					})}
				>
					<PaginationEllipsis />
				</PaginationItem>
				<PaginationItem>
					<PaginationNext
						href={page >= maxPage ? "" : getPageLink(page + 1)}
						className={cn({
							"text-foreground/50": page >= maxPage
						})}
					/>
				</PaginationItem>
			</PaginationContent>
		</_Pagination>
	)
}
