import { problemService } from "@/services/problem.service"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "sonner"

export const useReaction = (problemId: number) => {
	const [currentType, setCurrentType] = useState<"like" | "dislike">("like")

	return useMutation({
		mutationKey: ["problem-reaction", currentType, problemId],
		mutationFn: (type: "like" | "dislike" = "like") => {
			setCurrentType(type)
			return type === "like"
				? problemService.like(problemId)
				: problemService.dislike(problemId)
		},
		onSuccess() {
			toast.success(`Successfully ${currentType}d problem!`)
		}
	})
}
