import { Skeleton } from "@/components/shadcn/skeleton"
import { TableCell, TableRow } from "@/components/shadcn/table"
import { randomInt } from "@/lib/utils"

export const SkeletonTable = () => {
	return (
		<>
			{new Array(randomInt(1, 10)).fill(1).map((_, i) => (
				<TableRow key={i}>
					<TableCell colSpan={4}>
						<Skeleton className="h-10 w-full" />
					</TableCell>
				</TableRow>
			))}
		</>
	)
}
