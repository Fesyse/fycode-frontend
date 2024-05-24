import {
	Card,
	CardContent,
	CardHeader,
	CardTitle
} from "@/components/shadcn/card"
import { ScrollArea } from "@/components/shadcn/scroll-area"
import { Separator } from "@/components/shadcn/separator"
import { Skeleton } from "@/components/shadcn/skeleton"
import type { ExtendedProblem } from "@/types/problem.type"
import Image from "next/image"
import Link from "next/link"
import { type FC } from "react"
import Markdown from "react-markdown"
import { DescriptionLoading } from "./description-loading"
import { Tag } from "lucide-react"
import { Badge } from "@/components/shadcn/badge"

type DescriptionProps = {
	problem: ExtendedProblem | undefined
	isLoading: boolean
	isError: boolean
}

export const Description: FC<DescriptionProps> = ({ problem, isLoading }) => {
	return (
		<Card className="h-full rounded-3xl bg-muted/50">
			<CardHeader className="rounded-t-3xl bg-muted">
				{isLoading || !problem ? (
					<div className="flex gap-2">
						<Skeleton className="h-6 w-5 bg-muted-foreground/50" />
						<Skeleton className="h-6 w-1/3 bg-muted-foreground/50" />
					</div>
				) : (
					<CardTitle>{`${problem.id}. ${problem.title}`}</CardTitle>
				)}
			</CardHeader>
			<CardContent className="h-full px-0 py-4">
				<ScrollArea
					className="h-[calc(100vh-11.5rem)] px-6"
					scrollbarClassName="mr-1"
				>
					<div className="flex flex-col gap-4">
						{isLoading || !problem ? (
							<DescriptionLoading />
						) : (
							<>
								<Markdown className="leading-8">{problem.description}</Markdown>
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
			</CardContent>
		</Card>
	)
}
