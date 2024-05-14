"use client"

import { useTheme } from "next-themes"
import type { FC, PropsWithChildren } from "react"
import { Toaster } from "sonner"

export const ToastProvider: FC<PropsWithChildren> = ({ children }) => {
	const { theme } = useTheme()
	return (
		<>
			{children}
			<Toaster
				theme={theme as "light" | "dark" | "system" | undefined}
				position="bottom-right"
			/>
		</>
	)
}
