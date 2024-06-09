import type { FC, PropsWithChildren } from "react"
import { QueryProvider } from "@/components/providers/query-provider"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { ToastProvider } from "@/components/providers/toast-provider"

export const Providers: FC<PropsWithChildren> = ({ children }) => {
	return (
		<QueryProvider>
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
				<ToastProvider>{children}</ToastProvider>
			</ThemeProvider>
		</QueryProvider>
	)
}
