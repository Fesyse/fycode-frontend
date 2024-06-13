import type { FC, PropsWithChildren } from "react"
import { Footer } from "@/components/layout/root-layout/footer"
import { Header } from "@/components/layout/root-layout/header"

export const RootLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="flex flex-col items-center">
			<Header />
			<div className="min-h-[calc(100vh-4rem)] max-xl:min-h-[calc(100vh-3.5rem)] max-lg:min-h-screen w-full max-w-[1440px] px-4 py-20">
				{children}
			</div>
			<Footer />
		</div>
	)
}
