import axios from "axios"
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { userService } from "@/services/user.service"
import { env } from "@/env"
import { usePathname } from "next/navigation"

export const useUpdateAvatar = () => {
	const pathname = usePathname()
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ["update avatar"],
		mutationFn: (formData: FormData) => userService.updateAvatar(formData),
		onSuccess() {
			void queryClient.invalidateQueries({ queryKey: ["user"] })
			void axios.post(
				`${env.NEXT_PUBLIC_CLIENT_URL}/api/revalidate-path?path=${env.NEXT_PUBLIC_CLIENT_URL + pathname}`
			)
			toast.success("Successfully changed avatar.")
		},
		onError() {
			toast.error("An error occurred, when tried to change avatar.")
		}
	})
}
