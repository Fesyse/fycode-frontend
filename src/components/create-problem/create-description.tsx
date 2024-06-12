"use client"

import debounce from "lodash.debounce"
import { Edit, ScanEye } from "lucide-react"
import { useCallback, useState } from "react"
import { type CreateProblem } from "@/types/problem.type"
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle
} from "@/components/shadcn/card"
import { Input } from "@/components/shadcn/input"
import { ResizablePanel } from "@/components/shadcn/resizable"
import { ScrollArea } from "@/components/shadcn/scroll-area"
import { Separator } from "@/components/shadcn/separator"
import { Textarea } from "@/components/shadcn/textarea"
import { Button } from "../shadcn/button"
import { MarkdownRenderer } from "../ui/markdown-renderer"
import { useCreateProblemStore } from "@/stores/problem/create-problem.store"
import { useUserStore } from "@/stores/user.store"

export const CreateDescription = () => {
	const user = useUserStore(s => s.user)
	const { updateProblem, problem } = useCreateProblemStore()
	const [descriptionTab, setDescriptionTab] = useState<"edit" | "preview">(
		"edit"
	)

	const handleUpdateProblem = useCallback(
		debounce((problem: Partial<CreateProblem>) => {
			updateProblem(problem, user?.id)
		}, 350),
		[]
	)

	return (
		<ResizablePanel minSize={15} defaultSize={40}>
			<Card className="h-full overflow-hidden rounded-xl">
				<CardHeader className="bg-muted py-3">
					<CardTitle>
						<Input
							type="text"
							className="bg-editor"
							maxLength={8}
							defaultValue={problem.title}
							onChange={e => handleUpdateProblem({ title: e.target.value })}
						/>
					</CardTitle>
				</CardHeader>
				<CardContent className="flex h-full flex-col justify-between bg-editor px-0 pt-2">
					<ScrollArea
						className="px-6 max-[780px]:h-full min-[780px]:h-[calc(100vh-12.5rem)]"
						scrollbarClassName="mr-1"
					>
						<div className="grid gap-2 mb-6">
							<div className="flex gap-2">
								<Button
									onClick={() => setDescriptionTab("edit")}
									className="gap-2"
								>
									Edit <Edit strokeWidth={1.5} />
								</Button>
								<Button
									onClick={() => setDescriptionTab("preview")}
									className="gap-2"
								>
									Preview <ScanEye strokeWidth={1.5} />
								</Button>
							</div>
							<p className="text-foreground/50 text-sm">Markdown enabled.</p>
							{descriptionTab === "edit" ? (
								<Textarea
									className="bg-muted/50"
									defaultValue={problem?.description ?? ""}
									onChange={e =>
										handleUpdateProblem({ description: e.target.value })
									}
								/>
							) : !problem.description ? (
								<p>You need to type something in order to see preview here.</p>
							) : (
								<MarkdownRenderer markdown={problem.description} />
							)}
						</div>
						<div className="flex flex-col gap-4">
							<p className="flex gap-2 items-center">
								<span className="text-nowrap">function name =</span>
								<Input
									type="text"
									maxLength={10}
									defaultValue={problem.functionOptions?.name}
									className="bg-muted/50 text-sm h-8 p-0 max-w-28 px-2"
								/>
							</p>
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
