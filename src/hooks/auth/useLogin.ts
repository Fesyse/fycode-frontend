import { useMutation } from "@tanstack/react-query"
import { type AxiosError } from "axios"
import { toast } from "sonner"
import type { LoginRequest } from "@/types/auth.type"
import { errorCatch } from "@/api/error"
import { authService } from "@/services/auth.service"
import { useUserStore } from "@/stores/user.store"

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
		onError: (error: AxiosError) => {
			removeUser()
			toast.error("An error occurred, when tried to login.", {
				description: errorCatch(error)
			})
		}
	})
	return { login, loginAsync, ...rest }
}
