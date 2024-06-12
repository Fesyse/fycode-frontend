"use client"

import type { FC, PropsWithChildren } from "react"
import { Toaster } from "@/components/shadcn/sonner"

export const ToastProvider: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			{children}
			<Toaster position="bottom-right" />
		</>
	)
}
