import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { type CreateProblem } from "@/types/problem.type"
import { errorCatch } from "@/api/error"
import { problemService } from "@/services/problem.service"

export const useCreateProblem = () => {
	const router = useRouter()

	return useMutation({
		mutationFn: (problem: CreateProblem) => problemService.create(problem),
		onSuccess(problem) {
			toast.success("Successfully created problem! Redirecting...")
			router.push(`/problem/${problem.id}`)
		},
		onError(error) {
			toast.error("An error occured, when tried to create problem.", {
				description: errorCatch(error)
			})
		}
	})
}
