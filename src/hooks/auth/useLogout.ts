import { authService } from "@/services/auth.service"
import { useMutation } from "@tanstack/react-query"
import { useUserStore } from "@/stores/user.store"
import { toast } from "sonner"

export const useLogout = () => {
	const removeUser = useUserStore(s => s.removeUser)
	const { mutate: logout, ...rest } = useMutation({
		mutationKey: ["logout"],
		mutationFn: () => authService.logout(),
		onSuccess() {
			removeUser()
			toast.success("Successfully logged out!")
		}
	})
	return { logout, ...rest }
}
