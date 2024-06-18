import { Settings } from "lucide-react"
import { useState } from "react"
import { mediaQueryOptions, useMediaQuery } from "@/hooks/useMediaQuery"
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
import { CodeEditorOptionsForm } from "./code-editor-options-form"

export const CodeEditorOptions = () => {
	const [open, setOpen] = useState(false)
	const isMobile = useMediaQuery(mediaQueryOptions.small)
	const content = {
		button: (
			<Button variant="ghost" size="smallIcon">
				<Settings size={18} />
			</Button>
		),
		header: {
			title: "Code editor options",
			description: "There you can specify your preferences for code editor."
		},
		ui: <CodeEditorOptionsForm />
	}

	const props = { open, onOpenChange: setOpen }

	return isMobile ? (
		<Drawer {...props}>
			<DrawerTrigger>{content.button}</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>{content.header.title}</DrawerTitle>
					<DrawerDescription>{content.header.description}</DrawerDescription>
				</DrawerHeader>
				<div className="px-4 pb-6">{content.ui}</div>
			</DrawerContent>
		</Drawer>
	) : (
		<Dialog {...props}>
			<DialogTrigger>{content.button}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{content.header.title}</DialogTitle>
					<DialogDescription>{content.header.description}</DialogDescription>
				</DialogHeader>
				{content.ui}
			</DialogContent>
		</Dialog>
	)
}
