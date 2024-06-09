import { type FC } from "react"
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTrigger
} from "@/components/shadcn/sheet"
import { Menu } from "@/components/ui/menu"
import { Links } from "./links"
import { Logo } from "@/components/ui/logo"
import Link from "next/link"

export const Burger: FC = () => {
	return (
		<Sheet>
			<SheetTrigger>
				<Menu size={30} />
			</SheetTrigger>
			<SheetContent className="w-[300px]" side="left">
				<SheetHeader>
					<Link href="/">
						<Logo className="text-2xl" />
					</Link>
				</SheetHeader>
				<div className="mt-4 [&_a]:text-lg">
					<Links orientation="vertical" />
				</div>
			</SheetContent>
		</Sheet>
	)
}
