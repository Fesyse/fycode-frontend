import { usePathname } from "next/navigation"
import axios from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type z } from "zod"
import { toast } from "sonner"
import { env } from "@/env"
import { userService } from "@/services/user.service"
import { type updateUserFormSchema } from "@/lib/schemas"

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
		onError() {
			toast.error("An error occurred, when tried to update avatar.")
		}
	})
}
