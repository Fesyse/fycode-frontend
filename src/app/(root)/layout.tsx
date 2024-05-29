import { type PropsWithChildren } from "react"
import { RootLayout } from "@/components/layout/root-layout"

export default function Layout({ children }: PropsWithChildren) {
	return <RootLayout>{children}</RootLayout>
}
