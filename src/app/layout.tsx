import { ThemeProvider } from "@/components/theme-provider"
import { ToastProvider } from "@/components/toast-provider"
import { QueryProvider } from "@/components/query-provider"
import "@/styles/globals.css"
import { type Metadata } from "next"

import { Comfortaa } from "next/font/google"

const comfortaa = Comfortaa({
	subsets: ["latin"],
	variable: "--font-comfortaa"
})

export const metadata: Metadata = {
	title: {
		default: "Fycode",
		template: "%s | Fycode"
	},
	description: "A place to test your programming skills on real problems.",
	icons: [{ rel: "icon", url: "/favicon.ico" }]
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" className={`${comfortaa.variable}`}>
			<body>
				<QueryProvider>
					<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
						<ToastProvider>{children}</ToastProvider>
					</ThemeProvider>
				</QueryProvider>
			</body>
		</html>
	)
}
