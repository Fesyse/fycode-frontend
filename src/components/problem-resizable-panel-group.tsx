"use client"

import type { FC, PropsWithChildren } from "react"
import { type PanelGroup } from "react-resizable-panels"
import { ResizablePanelGroup } from "./shadcn/resizable"
import { useMediaQuery } from "@/hooks/useMediaQuery"

type ProblemResizablePanelGroupProps = React.ComponentProps<typeof PanelGroup>

export const ProblemResizablePanelGroup: FC<
	PropsWithChildren<ProblemResizablePanelGroupProps>
> = ({ children, direction: _direction, ...props }) => {
	const isMobile = useMediaQuery("(max-width: 760px)")

	return (
		<ResizablePanelGroup
			{...props}
			direction={isMobile ? "vertical" : "horizontal"}
		>
			{children}
		</ResizablePanelGroup>
	)
}
