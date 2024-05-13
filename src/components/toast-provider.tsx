"use client"

import type { FC, PropsWithChildren } from "react"
import { Toaster } from "sonner"

export const ToastProvider: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			{children}
			<Toaster position="top-center" />
		</>
	)
}
