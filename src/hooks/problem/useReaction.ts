import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "sonner"
import { errorCatch } from "@/api/error"
import { problemService } from "@/services/problem.service"

export const useReaction = (problemId: number) => {
	const [currentType, setCurrentType] = useState<"like" | "dislike">("like")

	return useMutation({
		mutationKey: ["problem-reaction", currentType, problemId],
		mutationFn: (opts: { type: "like" | "dislike"; undo: boolean }) => {
			setCurrentType(opts.type)
			return opts.type === "like"
				? problemService.like(problemId, opts.undo)
				: problemService.dislike(problemId, opts.undo)
		},
		onSuccess() {
			toast.success(`Successfully ${currentType}d problem!`)
		},
		onError(error) {
			toast.error(`Failed to ${currentType} problem.`, {
				description: error.message.includes("401")
					? "You need to authorize to like/dislike problem."
					: errorCatch(error)
			})
		}
	})
}
