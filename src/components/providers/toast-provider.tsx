"use client"

import type { FC, PropsWithChildren } from "react"
import { mediaQueryOptions, useMediaQuery } from "@/hooks/useMediaQuery"
import { Toaster } from "@/components/shadcn/sonner"

export const ToastProvider: FC<PropsWithChildren> = ({ children }) => {
	const isMobile = useMediaQuery(mediaQueryOptions.small)

	return (
		<>
			{children}
			<Toaster position={isMobile ? "top-center" : "bottom-right"} />
		</>
	)
}
