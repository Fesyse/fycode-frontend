import type { FC, PropsWithChildren } from "react"
import { Header } from "@/components/layout/root-layout/header"
import { Footer } from "@/components/layout/root-layout/footer"

export const RootLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="flex flex-col items-center">
			<Header />
			<div className="h-screen max-w-[1440px] px-4 py-40">{children}</div>
			<Footer />
		</div>
	)
}
