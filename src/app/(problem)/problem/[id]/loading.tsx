import { CodeEditorLoading } from "@/components/problem/code-editor/code-editor-loading"
import { DescriptionLoading } from "@/components/problem/description/description-loading"
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup
} from "@/components/shadcn/resizable"

export default function ProblemLoading() {
	return (
		<ResizablePanelGroup direction="horizontal">
			<ResizablePanel className="pr-3" minSize={15} defaultSize={40}>
				<DescriptionLoading />
			</ResizablePanel>
			<ResizableHandle withHandle />
			<ResizablePanel className="pl-3" minSize={30} defaultSize={60}>
				<CodeEditorLoading />
			</ResizablePanel>
		</ResizablePanelGroup>
	)
}
