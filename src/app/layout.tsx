import { type Metadata } from "next"
import { Comfortaa } from "next/font/google"
import { type PropsWithChildren } from "react"
import { Providers } from "@/components/providers"
import "@/styles/globals.css"

const comfortaa = Comfortaa({
	subsets: ["latin"],
	variable: "--font-comfortaa"
})

export const metadata: Metadata = {
	title: {
		default: "Fycode",
		template: "%s | Fycode"
	},
	description: "A place to test your programming skills on real problems."
}

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en" className={comfortaa.variable}>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
