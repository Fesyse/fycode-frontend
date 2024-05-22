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
					<Skeleton className="h-6 w-1/3 bg-muted-foreground/50" />
				) : (
					<CardTitle>{`${problem?.id}. ${problem?.title}`}</CardTitle>
				)}
			</CardHeader>
			<CardContent className="h-full px-0 py-4">
				<ScrollArea
					className="h-[calc(100vh-11.5rem)] px-6"
					scrollbarClassName="mr-1"
				>
					<div className="flex flex-col gap-4">
						<Markdown>{problem?.description}</Markdown>
						<Separator />
						<Link
							href={isLoading ? `` : `/user/${problem?.creator.id}`}
							className="mt-auto flex items-center gap-2"
						>
							{isLoading || !problem ? (
								<>
									<Skeleton className="h-9 w-9 rounded-full bg-muted-foreground/50" />
									<Skeleton className="h-4 w-28 bg-muted-foreground/50" />
								</>
							) : (
								<>
									<Image
										className="h-12 w-12 rounded-full object-cover p-1"
										src={problem.creator.avatar ?? "/user-round.svg"}
										width={36}
										height={36}
										alt="username-image"
									/>
									<span>{problem.creator.username}</span>
								</>
							)}
						</Link>
					</div>
				</ScrollArea>
			</CardContent>
		</Card>
	)
}
