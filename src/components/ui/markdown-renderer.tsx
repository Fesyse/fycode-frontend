import { type FC } from "react"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import { cn } from "@/lib/utils"

type MarkdownRendererProps = {
	markdown: string
}

export const MarkdownRenderer: FC<MarkdownRendererProps> = ({ markdown }) => {
	return (
		<Markdown
			remarkPlugins={[remarkGfm]}
			rehypePlugins={[rehypeRaw]}
			components={{
				h1({ className, ...props }) {
					return (
						<h2
							{...props}
							className={cn(
								"scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
								className
							)}
						/>
					)
				},
				h2({ className, ...props }) {
					return (
						<h2
							{...props}
							className={cn(
								"scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
								className
							)}
						/>
					)
				},
				h3({ className, ...props }) {
					return (
						<h3
							{...props}
							className={cn(
								"scroll-m-20 text-2xl font-semibold tracking-tight",
								className
							)}
						/>
					)
				},
				h4({ className, ...props }) {
					return (
						<h4
							{...props}
							className={cn(
								"scroll-m-20 text-xl font-semibold tracking-tight",
								className
							)}
						/>
					)
				},
				p({ className, ...props }) {
					return (
						<p
							{...props}
							className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
						/>
					)
				},
				pre({ className, ...props }) {
					return (
						<pre {...props} className={cn("mt-6 border-l-2 pl-6", className)} />
					)
				},
				blockquote({ className, ...props }) {
					return (
						<blockquote
							{...props}
							className={cn("mt-6 border-l-2 pl-6 italic", className)}
						/>
					)
				},
				ul({ className, ...props }) {
					return (
						<ul
							{...props}
							className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}
						/>
					)
				},
				code({ className, children, ...props }) {
					const match = /language-(\w+)/.exec(className ?? "")

					return match ? (
						<div className="rounded-xl border border-border">
							<SyntaxHighlighter
								// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
								style={vscDarkPlus}
								PreTag="div"
								language={match[1]}
								{...props}
							>
								{String(children).replace(/\n$/, "")}
							</SyntaxHighlighter>
						</div>
					) : (
						<span
							className={cn(
								"relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
								className
							)}
							{...props}
						>
							{children}
						</span>
					)
				}
			}}
			className="leading-8"
		>
			{markdown}
		</Markdown>
	)
}
