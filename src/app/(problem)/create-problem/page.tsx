import type { Metadata } from "next"
import { CreateDescription } from "@/components/create-problem/create-description"
import { CreateSolution } from "@/components/create-problem/create-solution"
import {
	ResizableHandle,
	ResizablePanelGroup
} from "@/components/shadcn/resizable"

export const metadata: Metadata = {
	title: "Create problem"
}

export default function CreateProblemPage() {
	return (
		<ResizablePanelGroup className="gap-3" direction="horizontal">
			<CreateDescription />
			<ResizableHandle withHandle />
			<CreateSolution />
		</ResizablePanelGroup>
	)
}
