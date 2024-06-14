import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import type { RegisterRequest } from "@/types/auth.type"
import { errorCatch } from "@/api/error"
import { authService } from "@/services/auth.service"
import { useUserStore } from "@/stores/user.store"

export const useRegister = () => {
	const { setUser, removeUser } = useUserStore(s => s)
	const {
		mutate: register,
		mutateAsync: registerAsync,
		...rest
	} = useMutation({
		mutationKey: ["register"],
		mutationFn: (data: RegisterRequest) => authService.register(data),
		onSuccess: response => {
			setUser(response.user)
			toast.success("Successfully created a new account!")
		},
		onError: (error: Error) => {
			removeUser()
			toast.error("An error occurred, when tried to creating a new account.", {
				description: errorCatch(error)
			})
		}
	})
	return { register, registerAsync, ...rest }
}
