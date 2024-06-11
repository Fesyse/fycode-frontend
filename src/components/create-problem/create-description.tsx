import { Card, CardContent, CardHeader, CardTitle } from "../shadcn/card"
import { ResizablePanel } from "../shadcn/resizable"
import { ScrollArea } from "../shadcn/scroll-area"
import { Separator } from "../shadcn/separator"

export const CreateDescription = () => {
	return (
		<ResizablePanel minSize={15} defaultSize={40}>
			<Card className="h-full overflow-hidden rounded-xl">
				<CardHeader className="bg-muted py-3">
					<CardTitle>Create problem</CardTitle>
				</CardHeader>
				<CardContent className="flex h-full flex-col justify-between bg-editor px-0 pt-2">
					<ScrollArea
						className="px-6 max-[780px]:h-full min-[780px]:h-[calc(100vh-12.5rem)]"
						scrollbarClassName="mr-1"
					>
						<div className="flex flex-col gap-4">
							{/* <MarkdownRenderer markdown={problem.description} />
					<TooltipProvider>
						<p className="flex gap-1">
							function name ={" "}
							<strong>{problem.functionOptions.name}</strong>
							<Tooltip>
								<TooltipTrigger asChild>
									<CircleHelp size={18} strokeWidth={1.5} />
								</TooltipTrigger>
								<TooltipContent className="max-w-60 border-muted bg-editor font-normal">
									You need to implement a function with name{" "}
									<strong>{problem.functionOptions.name}</strong>, that will
									solve given problem, otherwise it will throw a compile
									error.
								</TooltipContent>
							</Tooltip>
						</p>
					</TooltipProvider> */}
							<Separator />
							<div className="flex items-center gap-4">
								{/* <Tag />
						{problem.tags?.length ? (
							<div className="-mb-1 flex items-center gap-3">
								{problem.tags.map((tag, i) => (
									<Badge key={i}>{tag}</Badge>
								))}
							</div>
						) : (
							<span>No tags are pinned by creator.</span>
						)} */}
							</div>
							{/* <Link
						href={`/user/${problem.creator.id}`}
						className="mt-auto flex items-center gap-2"
					>
						<Image
							className="h-12 w-12 rounded-full object-cover p-1"
							src={problem.creator.avatar ?? "/user-round.svg"}
							width={2048}
							height={2048}
							alt="username-image"
						/>
						<span>{problem.creator.username}</span>
					</Link> */}
						</div>
					</ScrollArea>
				</CardContent>
			</Card>
		</ResizablePanel>
	)
}
