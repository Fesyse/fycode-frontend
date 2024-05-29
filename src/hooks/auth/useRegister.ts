import type { RegisterRequest } from "@/types/auth.type"
import { authService } from "@/services/auth.service"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
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
			toast.error("An error occured trying to creating a new account.", {
				description: error.message
			})
		}
	})
	return { register, registerAsync, ...rest }
}
