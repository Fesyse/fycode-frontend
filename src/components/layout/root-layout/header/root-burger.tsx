import Link from "next/link"
import { type FC } from "react"
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTrigger
} from "@/components/shadcn/sheet"
import { Logo } from "@/components/ui/logo"
import { Menu } from "@/components/ui/menu"
import { Links } from "./links"

export const RootBurger: FC = () => {
	return (
		<Sheet>
			<SheetTrigger>
				<Menu size={30} />
			</SheetTrigger>
			<SheetContent className="w-[300px]" side="left">
				<SheetHeader className="text-left">
					<Link href="/">
						<Logo className="text-3xl" />
					</Link>
				</SheetHeader>
				<div className="mt-4 [&_a]:text-lg">
					<Links orientation="vertical" />
				</div>
			</SheetContent>
		</Sheet>
	)
}
