import { authService } from "@/services/auth.service"
import { type LoginRequest } from "@/types/auth.type"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import React from "react"

export const useLogin = () => {
	const { mutate: login, ...rest } = useMutation({
		mutationKey: ["login"],
		mutationFn: (data: LoginRequest) => authService.login(data),
		onSuccess: () => toast.success("Successfully logged in!"),
		onError: (error: unknown) =>
			toast.error("An error occured trying to login. Please try again later.", {
				description: React.createElement("div", {}, JSON.stringify(error))
			})
	})
	return { login, ...rest }
}
