import { zodResolver } from "@hookform/resolvers/zod"
import { PartyPopper } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { type z } from "zod"
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
import { createProblemSchema } from "@/lib/schemas"
import { useCreateProblemStore } from "@/stores/problem/create-problem.store"

export const CreateProblemButton = () => {
	const [open, setOpen] = useState(false)
	const { problem } = useCreateProblemStore()
	const isMobile = useMediaQuery("(max-width: 720px)")

	const form = useForm<z.infer<typeof createProblemSchema>>({
		resolver: zodResolver(createProblemSchema),
		mode: "onSubmit"
	})

	const handleCreateProblem = () => {
		const keysOfProblem = Object.keys(problem)
		for (const key of keysOfProblem) {
			if (key === "testsOptions" || key === "functionOptions") continue
			if (!problem[key]) return toast.error(`You have ${key}`)
		}
	}

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
		content: ""
	}
	return isMobile ? (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger>{content.button}</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>{content.header.title}</DrawerTitle>
					<DrawerDescription>{content.header.description}</DrawerDescription>
				</DrawerHeader>
				{content.content}
			</DrawerContent>
		</Drawer>
	) : (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger>{content.button}</DialogTrigger>
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
