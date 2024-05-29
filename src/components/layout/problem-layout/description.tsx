import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/components/shadcn/card"
import { ScrollArea } from "@/components/shadcn/scroll-area"
import { Separator } from "@/components/shadcn/separator"
import { Skeleton } from "@/components/shadcn/skeleton"
import type { ExtendedProblem } from "@/types/problem.type"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState, type FC } from "react"
import Markdown from "react-markdown"
import { DescriptionLoading } from "./description-loading"
import { Tag, ThumbsDown, ThumbsUp } from "lucide-react"
import { Badge } from "@/components/shadcn/badge"
import { Button } from "@/components/shadcn/button"
import { formatNumber } from "@/lib/utils"
import { useReaction } from "@/hooks/problem/useReaction"

type DescriptionProps = {
	problem: ExtendedProblem | undefined
	isLoading: boolean
	isError: boolean
}

export const Description: FC<DescriptionProps> = ({ problem, isLoading }) => {
	const [likes, setLikes] = useState<number>(problem?.likes ?? 0)
	const { mutateAsync: react } = useReaction(problem?.id ?? 1)
	const [reactionState, setReactionState] = useState({
		like: problem?.isLikedProblem,
		dislike: problem?.isDislikedProblem
	})

	const handleReaction = async (type: "like" | "dislike") => {
		const undo = reactionState[type]!
		const likes = await react({ type, undo })
		setLikes(likes)
		setReactionState({
			like: type === "like" ? (undo ? false : true) : false,
			dislike: type === "dislike" ? (undo ? false : true) : false
		})
	}

	useEffect(() => {
		if (!problem) return
		setLikes(problem.likes)
		setReactionState({
			like: false,
			dislike: false
		})
	}, [problem])

	return (
		<Card className="h-full overflow-hidden rounded-xl">
			<CardHeader className="bg-muted py-3">
				{isLoading || !problem ? (
					<div className="flex gap-2">
						<Skeleton className="h-6 w-5 bg-muted-foreground/25" />
						<Skeleton className="h-6 w-1/3 bg-muted-foreground/25" />
					</div>
				) : (
					<CardTitle>{`${problem.id}. ${problem.title}`}</CardTitle>
				)}
			</CardHeader>
			<CardContent className="bg-editor h-full px-0 pt-2">
				<ScrollArea
					className="h-[calc(100vh-12.5rem)] px-6"
					scrollbarClassName="mr-1"
				>
					<div className="flex flex-col gap-4">
						{isLoading || !problem ? (
							<DescriptionLoading />
						) : (
							<>
								<Markdown className="leading-8">{problem.description}</Markdown>
								<p>
									function name ={" "}
									<span className="font-bold">
										{problem.functionOptions.name}
									</span>
								</p>

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
										width={36}
										height={36}
										alt="username-image"
									/>
									<span>{problem.creator.username}</span>
								</Link>
							</>
						)}
					</div>
				</ScrollArea>
				<CardFooter className="pl-4">
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
							{isLoading || !problem ? (
								<Skeleton className="h-5 w-5 bg-muted-foreground/25" />
							) : (
								<span className="-mb-1 text-lg font-thin">
									{formatNumber(likes, { useOrderSuffix: true })}
								</span>
							)}
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
	)
}
