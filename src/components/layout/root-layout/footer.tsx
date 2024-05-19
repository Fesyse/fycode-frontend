import { Separator } from "@/components/shadcn/separator"
import { GitHubLogoIcon as Github } from "@radix-ui/react-icons"
import Image from "next/image"
import Link from "next/link"

export const Footer = () => {
	return (
		<div className="flex w-full justify-center border-t border-border bg-background">
			<div className="flex w-full max-w-[1440px] items-center justify-between gap-6 p-4">
				<div className="flex items-center gap-6 text-xl">
					Built with
					<Image src="/next-js.svg" alt="NEXT.js" width={75} height={20} />
					<Image src="/nest-js.svg" alt="NestJS" width={40} height={40} />
					<Image src="/shadcn-ui.svg" alt="shadcn/ui" width={40} height={40} />
				</div>
				<div className="text-foreground/50">Copyright (c) 2024 Fesyse</div>
				<div className="flex items-center gap-4">
					<span className="text-lg">Source</span>
					<Separator className="h-10" orientation="vertical" />
					<div className="flex flex-col items-start gap-2">
						<Link
							href="https://github.com/Fesyse/fycode-backend"
							className="flex w-full justify-between gap-2"
						>
							<span>Backend</span> <Github width={20} height={20} />
						</Link>
						<Separator className="w-full" />
						<Link
							href="https://github.com/Fesyse/fycode-frontend"
							className="flex w-full justify-between gap-2"
						>
							<span>Frontend</span> <Github width={20} height={20} />
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
