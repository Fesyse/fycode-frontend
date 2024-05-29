import "@/styles/globals.css"
import { type Metadata } from "next"

import { Comfortaa } from "next/font/google"
import { Providers } from "@/components/providers"
import { type PropsWithChildren } from "react"

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

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html suppressHydrationWarning lang="en" className={comfortaa.variable}>
			<body suppressHydrationWarning>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
