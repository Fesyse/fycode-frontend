import { userService } from "@/services/user.service"
import { type User } from "@/types/user.type"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

export const useUser = () => {
	const {
		data: user,
		isLoading,
		error
	} = useQuery<User>({
		initialData: undefined,
		queryKey: ["user"],
		queryFn: () => userService.get()
	})
	const [isUnauthorized, setIsUnauthorized] = useState<boolean>(true)

	return { user, isLoading, isUnauthorized }
}