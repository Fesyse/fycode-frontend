import { Logo } from "@/components/ui/logo"
import Link from "next/link"

export const Header = () => {
	return (
		<div className="flex">
			<Link href="/dashboard">
				<Logo className="text-xl" />
			</Link>
		</div>
	)
}
