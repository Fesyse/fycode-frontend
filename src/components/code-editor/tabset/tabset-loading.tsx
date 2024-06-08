import { TestTube, BugPlay } from "lucide-react"
import { Button } from "@/components/shadcn/button"
import { Card, CardHeader, CardContent } from "@/components/shadcn/card"
import { Skeleton } from "@/components/shadcn/skeleton"

export const TabsetLoading = () => {
	return (
		<Card className="group/wrapper relative h-full w-full overflow-hidden rounded-xl bg-editor">
			<CardHeader className="flex flex-row items-center justify-between bg-muted px-1 py-1">
				<div className="flex gap-2 text-muted-foreground">
					<Button
						size="sm"
						className="flex items-center bg-muted pl-2.5 pr-4 text-foreground hover:bg-editor/50"
					>
						<TestTube color="green" />
						Tests
					</Button>
					<Button
						size="sm"
						className="flex items-center gap-1 bg-muted px-2.5 text-foreground hover:bg-editor/50"
					>
						<BugPlay color="green" />
						Results
					</Button>
				</div>
			</CardHeader>
			<CardContent className="grid gap-4 bg-editor py-3">
				<Skeleton className="h-10 w-96 bg-muted-foreground/25" />
				<Skeleton className="h-10 w-48 bg-muted-foreground/25" />
				<Skeleton className="h-10 w-72 bg-muted-foreground/25" />
				<Skeleton className="h-10 w-36 bg-muted-foreground/25" />
			</CardContent>
		</Card>
	)
}
