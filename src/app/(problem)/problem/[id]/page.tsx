import { CodeEditor } from "@/components/code-editor"
import { Description } from "@/components/description"
import { ProblemResizablePanelGroup } from "@/components/problem-resizable-panel-group"
import { ResizableHandle } from "@/components/shadcn/resizable"
import { problemService } from "@/services/problem.service"
import { userService } from "@/services/user.service"
import { redirect } from "next/navigation"
import { toast } from "sonner"

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
		<ProblemResizablePanelGroup className="gap-3" direction="horizontal">
			<Description problem={problem} />
			<ResizableHandle withHandle />
			<CodeEditor problem={problem} />
		</ProblemResizablePanelGroup>
	)
}
