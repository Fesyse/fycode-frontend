"use client"

import { useState, type FC } from "react"
import Image from "next/image"
import Link from "next/link"
import { CircleHelp, Tag, ThumbsDown, ThumbsUp } from "lucide-react"
import type { ExtendedProblem } from "@/types/problem.type"
import { formatNumber } from "@/lib/utils"
import { useReaction } from "@/hooks/problem/useReaction"
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/components/shadcn/card"
import { ScrollArea } from "@/components/shadcn/scroll-area"
import { Separator } from "@/components/shadcn/separator"
import { Badge } from "@/components/shadcn/badge"
import { Button } from "@/components/shadcn/button"
import { MarkdownRenderer } from "@/components/ui/markdown-renderer"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@/components/shadcn/tooltip"
import { ResizablePanel } from "../shadcn/resizable"

type DescriptionProps = {
	problem: ExtendedProblem
}

export const Description: FC<DescriptionProps> = ({ problem }) => {
	const [likes, setLikes] = useState<number>(problem?.likes ?? 0)
	const { mutateAsync: react } = useReaction(problem?.id ?? 1)
	const [reactionState, setReactionState] = useState({
		like: problem?.isLikedProblem,
		dislike: problem?.isDislikedProblem
	})

	const handleReaction = async (type: "like" | "dislike") => {
		const undo = reactionState[type]
		const likes = await react({ type, undo })
		setLikes(likes)
		setReactionState({
			like: type === "like" ? (undo ? false : true) : false,
			dislike: type === "dislike" ? (undo ? false : true) : false
		})
	}

	return (
		<ResizablePanel minSize={15} defaultSize={40}>
			<Card className="h-full overflow-hidden rounded-xl">
				<CardHeader className="bg-muted py-3">
					<CardTitle>{`${problem.id}. ${problem.title}`}</CardTitle>
				</CardHeader>
				<CardContent className="flex h-full flex-col justify-between bg-editor px-0 pt-2">
					<ScrollArea
						className="px-6 max-[780px]:h-full min-[780px]:h-[calc(100vh-12.5rem)]"
						scrollbarClassName="mr-1"
					>
						<div className="flex flex-col gap-4">
							<MarkdownRenderer markdown={problem.description} />
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
							</TooltipProvider>
							<Separator />
							<div className="flex items-center gap-4">
								<Tag />
								{problem.tags?.length ? (
									<div className="-mb-1 flex items-center gap-3">
										{problem.tags.map((tag, i) => (
											<Badge key={i}>{tag}</Badge>
										))}
									</div>
								) : (
									<span>No tags are pinned by creator.</span>
								)}
							</div>
							<Link
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
							</Link>
						</div>
					</ScrollArea>
					<CardFooter className="mb-4">
						<div className="group flex gap-1 overflow-hidden rounded-xl">
							<Button
								variant="secondary"
								className="gap-2 rounded-sm bg-transparent p-3 group-hover:bg-muted"
								onClick={async () => handleReaction("like")}
							>
								<ThumbsUp
									fill={reactionState.like ? "#FFF" : "transparent"}
									color={!reactionState.like ? "#FFF" : "#1e1e1e"}
									size={24}
									strokeWidth={1}
								/>
								{/* {isProblemLoading || !problem ? (
									<Skeleton className="h-5 w-5 bg-muted-foreground/25" />
								) : (
								)} */}
								<span className="-mb-1 text-lg font-thin">
									{formatNumber(likes, { useOrderSuffix: true })}
								</span>
							</Button>
							<Button
								size="icon"
								variant="secondary"
								className="rounded-sm bg-transparent group-hover:bg-muted"
								onClick={async () => handleReaction("dislike")}
							>
								<ThumbsDown
									fill={reactionState.dislike ? "#FFF" : "transparent"}
									color={!reactionState.dislike ? "#FFF" : "#1e1e1e"}
									size={24}
									strokeWidth={1}
								/>
							</Button>
						</div>
					</CardFooter>
				</CardContent>
			</Card>
		</ResizablePanel>
	)
}
