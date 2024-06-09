"use client"

import Link from "next/link"
import { HOME_PAGE_CARD_ROUTES } from "@/constants/home-page.constant"
import { Card, CardDescription, CardHeader, CardTitle } from "../shadcn/card"
import { cn } from "@/lib/utils"

export const Cards = () => {
	return (
		<div className="mt-12 grid grid-cols-3 items-center justify-center gap-10 max-[1120px]:gap-4 max-[860px]:grid-cols-2 max-[580px]:grid-cols-1">
			{HOME_PAGE_CARD_ROUTES.map((card, i, cards) => (
				<Link
					className={cn({
						"max-[860px]:col-span-2 max-[580px]:col-span-1":
							cards.length - 1 === i
					})}
					key={card.link}
					href={card.link}
				>
					<Card className="w-full transition-all duration-200 hover:scale-[1.01] hover:shadow-md hover:shadow-border">
						<CardHeader className="max-[1120px]:p-4">
							<CardTitle className="flex items-center gap-2 max-[1120px]:text-lg">
								{card.title}
							</CardTitle>
							<CardDescription className="text-[1.0925rem] max-[1120px]:text-base">
								{card.description}
							</CardDescription>
						</CardHeader>
					</Card>
				</Link>
			))}
		</div>
	)
}
