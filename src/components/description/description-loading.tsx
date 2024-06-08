import { ThumbsUp, ThumbsDown } from "lucide-react"
import { Separator } from "@/components/shadcn/separator"
import { Skeleton } from "@/components/shadcn/skeleton"
import { ScrollArea } from "@/components/shadcn/scroll-area"
import { Button } from "@/components/shadcn/button"
import {
	Card,
	CardHeader,
	CardContent,
	CardFooter
} from "@/components/shadcn/card"

export const DescriptionLoading = () => {
	return (
		<Card className="h-full overflow-hidden rounded-xl">
			<CardHeader className="bg-muted py-3">
				<div className="flex gap-2">
					<Skeleton className="h-6 w-5 bg-muted-foreground/25" />
					<Skeleton className="h-6 w-1/3 bg-muted-foreground/25" />
				</div>
			</CardHeader>
			<CardContent className="h-full bg-editor px-0 pt-2">
				<ScrollArea
					className="h-[calc(100vh-12.5rem)] px-6"
					scrollbarClassName="mr-1"
				>
					<div className="flex flex-col gap-4">
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
					</div>
				</ScrollArea>
				<CardFooter className="pl-4">
					<div className="group flex gap-1 overflow-hidden rounded-xl">
						<Button
							variant="secondary"
							className="gap-2 rounded-sm bg-transparent p-3 group-hover:bg-muted"
						>
							<ThumbsUp
								fill="transparent"
								color="#FFF"
								size={24}
								strokeWidth={1}
							/>
							<Skeleton className="h-5 w-5 bg-muted-foreground/25" />
						</Button>
						<Button
							size="icon"
							variant="secondary"
							className="rounded-sm bg-transparent group-hover:bg-muted"
						>
							<ThumbsDown
								fill="transparent"
								color="#FFF"
								size={24}
								strokeWidth={1}
							/>
						</Button>
					</div>
				</CardFooter>
			</CardContent>
		</Card>
	)
}
