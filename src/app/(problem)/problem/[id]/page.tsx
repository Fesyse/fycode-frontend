import { CodeEditor } from "@/components/code-editor"
import { Description } from "@/components/description"
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup
} from "@/components/shadcn/resizable"
import { sleep } from "@/lib/utils"
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
		await sleep(10000)
		problem = await problemService.getById(params.id, user?.id)
	} catch {
		toast.error("Problem with given id was not found")
		return redirect("/dashboard")
	}

	return (
		<ResizablePanelGroup direction="horizontal">
			<ResizablePanel className="pr-3" minSize={15} defaultSize={40}>
				<Description problem={problem} />
			</ResizablePanel>
			<ResizableHandle withHandle />
			<ResizablePanel className="pl-3" minSize={30} defaultSize={60}>
				<CodeEditor problem={problem} />
			</ResizablePanel>
		</ResizablePanelGroup>
	)
}
