import { ThemeProvider } from "@/components/theme-provider"
import { ToastProvider } from "@/components/toast-provider"
import "@/styles/globals.css"

import { Comfortaa } from "next/font/google"

const comfortaa = Comfortaa({
	subsets: ["latin"],
	variable: "--font-comfortaa"
})

export const metadata = {
	title: "Fycode",
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
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<ToastProvider>{children}</ToastProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
