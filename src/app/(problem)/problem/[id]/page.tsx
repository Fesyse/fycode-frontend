"use client"

import { Button } from "@/components/shadcn/button"
import { userService } from "@/services/user.service"
import { useMutation } from "@tanstack/react-query"
import { useEffect } from "react"

export default function Page() {
	const { data, mutate } = useMutation({
		mutationKey: ["update-user-avatar"],
		mutationFn: () => userService.updateAvatar()
	})

	useEffect(() => console.log(data), [data])
	return (
		<div>
			<Button onClick={() => mutate()}></Button>
		</div>
	)
}
