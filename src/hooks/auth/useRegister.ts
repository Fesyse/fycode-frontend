import { authService } from "@/services/auth.service"
import { type RegisterRequest } from "@/types/auth.type"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import React from "react"

export const useRegister = () => {
	const { mutate: register, ...rest } = useMutation({
		mutationKey: ["register"],
		mutationFn: (data: RegisterRequest) => authService.register(data),
		onSuccess: () => toast.success("Successfully created a new account!"),
		onError: (error: unknown) =>
			toast.error(
				"An error occured trying to creating a new account. Please try again later.",
				{ description: React.createElement("div", {}, JSON.stringify(error)) }
			)
	})
	return { register, ...rest }
}
