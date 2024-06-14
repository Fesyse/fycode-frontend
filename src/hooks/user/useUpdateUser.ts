import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { usePathname } from "next/navigation"
import { toast } from "sonner"
import { type z } from "zod"
import { errorCatch } from "@/api/error"
import { env } from "@/env"
import { type updateUserFormSchema } from "@/lib/schemas"
import { userService } from "@/services/user.service"

export const useUpdateUser = (userId: string) => {
	const pathname = usePathname()
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ["update-user", userId],
		mutationFn: (data: z.infer<typeof updateUserFormSchema>) =>
			userService.update(data),
		onSuccess() {
			void queryClient.invalidateQueries({ queryKey: ["user"] })
			void axios.post(
				`${env.NEXT_PUBLIC_CLIENT_URL}/api/revalidate-path?path=${env.NEXT_PUBLIC_CLIENT_URL + pathname}`
			)
			toast.success("Successfully updated profile.")
		},
		onError(error) {
			toast.error("An error occurred, when tried to update avatar.", {
				description: errorCatch(error)
			})
		}
	})
}
