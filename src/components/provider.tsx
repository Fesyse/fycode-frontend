import { QueryProvider } from "@/components/query-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { ToastProvider } from "@/components/toast-provider"
import { UserStoreProvider } from "@/components/user-store-provider"
import type { FC, PropsWithChildren } from "react"

export const Provider: FC<PropsWithChildren> = ({ children }) => {
	return (
		<QueryProvider>
			<UserStoreProvider>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<ToastProvider>{children}</ToastProvider>
				</ThemeProvider>
			</UserStoreProvider>
		</QueryProvider>
	)
}
