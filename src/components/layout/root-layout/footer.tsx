import Image from "next/image"
import Link from "next/link"
import { GitHubLogoIcon as Github } from "@radix-ui/react-icons"
import { Separator } from "@/components/shadcn/separator"

export const Footer = () => {
	return (
		<footer className="flex w-full justify-center border-t border-border backdrop-blur-lg">
			<div className="flex w-full max-w-[1440px] items-center justify-between gap-6 p-4 max-2xl:py-2 max-lg:flex-col max-lg:gap-4 max-lg:py-4">
				<div className="flex items-center gap-6 text-xl max-2xl:gap-2">
					<span className="max-2xl:hidden">Built with</span>
					<Link href="https://nextjs.org/">
						<Image
							className="max-2xl:h-[2rem] max-2xl:w-10"
							src="/next-js.svg"
							alt="NEXT.js"
							width={75}
							height={20}
						/>
					</Link>
					<Link href="https://ui.shadcn.com/docs">
						<Image
							className="max-2xl:h-7 max-2xl:w-7"
							src="/shadcn-ui.svg"
							alt="shadcn/ui"
							width={40}
							height={40}
						/>
					</Link>
					<Link href="https://nestjs.com/">
						<Image
							className="max-2xl:h-7 max-2xl:w-7"
							src="/nest-js.svg"
							alt="NestJS"
							width={40}
							height={40}
						/>
					</Link>
				</div>
				<div className="text-foreground/50 max-2xl:text-sm max-xl:text-lg">
					Copyright (c) 2024 Fesyse
				</div>
				<div className="flex items-center gap-4 max-2xl:gap-2 max-2xl:text-sm">
					<span className="text-lg max-2xl:text-base">Source</span>
					<Separator className="h-10" orientation="vertical" />
					<div className="flex flex-col items-start gap-2 max-2xl:gap-1">
						<Link
							href="https://github.com/Fesyse/fycode-backend"
							className="flex w-full justify-between gap-2"
						>
							<span>Backend</span>{" "}
							<Github className="max-2xl:hidden" width={20} height={20} />
						</Link>
						<Separator className="w-full" />
						<Link
							href="https://github.com/Fesyse/fycode-frontend"
							className="flex w-full justify-between gap-2"
						>
							<span>Frontend</span>{" "}
							<Github className="max-2xl:hidden" width={20} height={20} />
						</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}
