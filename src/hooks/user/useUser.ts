import { userService } from "@/services/user.service"
import { type User } from "@/types/user.type"
import { useQuery } from "@tanstack/react-query"
import { useUserStore } from "@/stores/user.store"
import { useEffect, useState } from "react"
import { getAccessToken } from "@/services/auth-token.service"

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

	const token = getAccessToken()
	const [isAuthorized, setIsAuthorized] = useState<boolean>(
		token !== undefined && token !== "undefined"
	)

	useEffect(() => {
		if (isSuccess && user) {
			setIsAuthorized(true)
			setUser(user)
		}
	}, [isSuccess, setUser, user])

	return { user, isAuthorized, isLoading, isError, refetchUser, error }
}
