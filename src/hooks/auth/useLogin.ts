import type { RequestError, LoginRequest } from "@/types/auth.type"
import { authService } from "@/services/auth.service"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { useUserStore } from "@/hooks/stores/useUserStore"

export const useLogin = () => {
	const { setUser, removeUser } = useUserStore(s => s)
	const {
		mutate: login,
		mutateAsync: loginAsync,
		...rest
	} = useMutation({
		mutationKey: ["login"],
		mutationFn: (data: LoginRequest) => authService.login(data),
		onSuccess: response => {
			setUser(response.user)
			toast.success("Successfully logged in!")
		},
		onError: (error: RequestError) => {
			removeUser()
			toast.error("An error occured trying to login.", {
				description: error.message
			})
		}
	})
	return { login, loginAsync, ...rest }
}