import { Plus, Tag, X } from "lucide-react"
import { useRef } from "react"
import { Badge } from "@/components/shadcn/badge"
import { Button } from "@/components/shadcn/button"
import { Input } from "@/components/shadcn/input"
import { useCreateProblemStore } from "@/stores/problem/create-problem.store"
import { useUserStore } from "@/stores/user.store"

export const CreateTags = () => {
	const { problem, updateProblem } = useCreateProblemStore()
	const user = useUserStore(s => s.user)

	const tagInputRef = useRef<HTMLInputElement | null>(null)

	const handleUpdateProblemTags = () => {
		if (!tagInputRef.current) return
		updateProblem(
			{
				tags: [...(problem.tags ?? []), tagInputRef.current.value.toUpperCase()]
			},
			user?.id
		)
		tagInputRef.current.value = ""
	}
	const removeProblemTag = (index: number) => {
		updateProblem(
			{
				tags: problem?.tags?.filter((_, i) => i !== index)
			},
			user?.id
		)
	}

	return (
		<ul className="flex items-center gap-2">
			<Tag />
			<li className="-mb-1 flex items-center gap-3">
				{(problem?.tags ?? []).map((tag, i) => (
					<Badge key={i}>
						{tag}
						<X size={14} role="button" onClick={() => removeProblemTag(i)} />
					</Badge>
				))}
			</li>
			<div className="flex gap-2 items-center">
				<Input ref={tagInputRef} className="max-w-20 bg-muted/50" />
				<Button
					size="icon"
					variant="secondary"
					onClick={handleUpdateProblemTags}
				>
					<Plus />
				</Button>
			</div>
		</ul>
	)
}
