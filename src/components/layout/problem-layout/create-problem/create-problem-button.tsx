import { PartyPopper } from "lucide-react"
import { useState } from "react"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { Button } from "@/components/shadcn/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/shadcn/dialog"
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger
} from "@/components/shadcn/drawer"
import { CreateProblemForm } from "./create-problem-form"

export const CreateProblemButton = () => {
	const [open, setOpen] = useState(false)
	const isMobile = useMediaQuery("(max-width: 720px)")

	const content = {
		button: (
			<Button
				size={isMobile ? "xs" : "sm"}
				className="max-[720px]:text-xs gap-2"
			>
				Finish <PartyPopper strokeWidth={isMobile ? 1.5 : 1} />
			</Button>
		),
		header: {
			title: "Fill information below to proceed.",
			description: "Final steps and your problem is ready to go."
		},
		content: <CreateProblemForm />
	}
	return isMobile ? (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>{content.button}</DrawerTrigger>
			<DrawerContent className="px-4 py-2">
				<DrawerHeader>
					<DrawerTitle>{content.header.title}</DrawerTitle>
					<DrawerDescription>{content.header.description}</DrawerDescription>
				</DrawerHeader>
				{content.content}
			</DrawerContent>
		</Drawer>
	) : (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{content.button}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{content.header.title}</DialogTitle>
					<DialogDescription>{content.header.description}</DialogDescription>
				</DialogHeader>
				{content.content}
			</DialogContent>
		</Dialog>
	)
}
