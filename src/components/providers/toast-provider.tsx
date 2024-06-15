"use client"

import type { FC, PropsWithChildren } from "react"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { Toaster } from "@/components/shadcn/sonner"

export const ToastProvider: FC<PropsWithChildren> = ({ children }) => {
	const isMobile = useMediaQuery("(max-width: 720px)")

	return (
		<>
			{children}
			<Toaster position={isMobile ? "top-center" : "bottom-right"} />
		</>
	)
}
