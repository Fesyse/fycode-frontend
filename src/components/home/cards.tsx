"use client"

import Link from "next/link"
import { HOME_PAGE_CARD_ROUTES } from "@/constants/home-page.constant"
import { Card, CardHeader, CardTitle, CardDescription } from "../shadcn/card"

export const Cards = () => {
	return (
		<div className="mt-12 grid grid-cols-3 items-center gap-10">
			{HOME_PAGE_CARD_ROUTES.map(card => (
				<Link key={card.link} href={card.link}>
					<Card className="max-w-[30rem] transition-all duration-200 hover:scale-[1.01] hover:shadow-md hover:shadow-border">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								{card.title}
							</CardTitle>
							<CardDescription className="text-[1.0925rem]">
								{card.description}
							</CardDescription>
						</CardHeader>
					</Card>
				</Link>
			))}
		</div>
	)
}
