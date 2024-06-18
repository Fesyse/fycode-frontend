import type { Metadata } from "next"
import { CreateCustomTests } from "@/components/problem/create-problem/create-custom-tests"
import { CreateDescription } from "@/components/problem/create-problem/create-description"
import { CreateSolution } from "@/components/problem/create-problem/create-solution"
import {
	ResizableHandle,
	ResizablePanel,
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
			<ResizablePanel minSize={30} defaultSize={60}>
				<ResizablePanelGroup className="gap-3" direction="vertical">
					<CreateSolution />
					<ResizableHandle withHandle />
					<CreateCustomTests />
				</ResizablePanelGroup>
			</ResizablePanel>
		</ResizablePanelGroup>
	)
}
