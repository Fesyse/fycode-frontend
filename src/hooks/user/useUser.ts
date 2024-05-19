import { userService } from "@/services/user.service"
import { type User } from "@/types/user.type"
import { useQuery } from "@tanstack/react-query"
import { useUserStore } from "../stores/useUserStore"
import { useEffect } from "react"

export const useUser = () => {
	const setUser = useUserStore(s => s.setUser)
	const {
		data: user,
		isLoading,
		isSuccess,
		isError,
		error,
		refetch: refetchUser
	} = useQuery<User>({
		initialData: undefined,
		queryKey: ["user"],
		queryFn: () => userService.get()
	})

	useEffect(() => {
		if (isSuccess && user) setUser(user)
	}, [isSuccess, setUser, user])

	return { user, isLoading, isError, refetchUser, error }
}
