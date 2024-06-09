import { Cards } from "@/components/home/cards"
import { Logo } from "@/components/ui/logo"

export default function HomePage() {
	return (
		<main className="flex h-full flex-col items-center justify-center gap-2">
			<div className="flex flex-col items-center gap-6 max-xl:gap-2">
				<h1 className="text-8xl max-xl:text-6xl">
					<Logo />
				</h1>
				<h2 className="max-w-[35rem] text-center text-2xl text-foreground/75 max-xl:text-xl">
					A place to test your programming skills on real{" "}
					<span className="font-bold">problems</span>.{" "}
				</h2>
			</div>
			<Cards />
		</main>
	)
}
