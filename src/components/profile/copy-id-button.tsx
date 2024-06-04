"use client"

import { type FC } from "react"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@/components/shadcn/tooltip"
import { Button } from "@/components/shadcn/button"
import { Clipboard } from "lucide-react"
import { toast } from "sonner"

type CopyIdButtonProps = {
	id: string
}

export const CopyIdButton: FC<CopyIdButtonProps> = ({ id }) => {
	const copyUserId = async () => {
		try {
			await navigator.clipboard.writeText(id)
			toast.success("Successfully copied user ID to clipboard.")
		} catch (err) {
			toast.error("An error occurred, when tried to copy user id", {
				description: `ID: ${id}`
			})
		}
		return
	}

	return (
		<TooltipProvider>
			<Tooltip delayDuration={0}>
				<TooltipTrigger asChild>
					<Button
						onClick={() => copyUserId()}
						className="h-6 w-6 p-0.5"
						variant="ghost"
					>
						<Clipboard size={16} />
					</Button>
				</TooltipTrigger>
				<TooltipContent>Copy user ID</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
