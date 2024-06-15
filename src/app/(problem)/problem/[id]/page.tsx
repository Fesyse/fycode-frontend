import { redirect } from "next/navigation"
import { toast } from "sonner"
import { CodeEditor } from "@/components/code-editor"
import { Description } from "@/components/description"
import { ResizableHandle } from "@/components/shadcn/resizable"
import { ProblemResizablePanelGroup } from "@/components/ui/problem-resizable-panel-group"
import { problemService } from "@/services/problem.service"
import { userService } from "@/services/user.service"

export default async function Page({ params }: { params: { id: string } }) {
	let user = undefined
	try {
		user = await userService.get()
	} catch {}
	let problem = undefined
	try {
		problem = await problemService.getById(params.id, user?.id)
	} catch {
		toast.error("Problem with given id was not found")
		return redirect("/dashboard")
	}

	return (
		<>
			<head suppressContentEditableWarning suppressHydrationWarning>
				<title>{`${problem.title} | Fycode`}</title>
			</head>
			<ProblemResizablePanelGroup className="gap-3" direction="horizontal">
				<Description problem={problem} />
				<ResizableHandle withHandle />
				<CodeEditor problem={problem} />
			</ProblemResizablePanelGroup>
		</>
	)
}
