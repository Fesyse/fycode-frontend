import { Separator } from "@/components/shadcn/separator"
import { Skeleton } from "@/components/shadcn/skeleton"

export const DescriptionLoading = () => {
	return (
		<>
			<div className="flex flex-col gap-4">
				<Skeleton className="h-5 w-96 bg-muted-foreground/25" />
				<Skeleton className="h-5 w-28 bg-muted-foreground/25" />
				<Skeleton className="h-5 w-72 bg-muted-foreground/25" />
				<Skeleton className="h-5 w-64 bg-muted-foreground/25" />
				<Skeleton className="h-5 w-60 bg-muted-foreground/25" />
				<Skeleton className="h-5 w-36 bg-muted-foreground/25" />
			</div>
			<Separator />
			<div className="mt-auto flex items-center gap-2">
				<Skeleton className="h-9 w-9 rounded-full bg-muted-foreground/25" />
				<Skeleton className="h-4 w-28 bg-muted-foreground/25" />
			</div>
		</>
	)
}
