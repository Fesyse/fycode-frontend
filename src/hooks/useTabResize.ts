import { useLayoutEffect } from "react"
import { type FieldErrors } from "react-hook-form"

type UseTabResize = (options: {
	errors: FieldErrors<
		| {
				email: string
				password: string
				username: string
		  }
		| { email: string; password: string }
	>
	setTabSizes: (
		value: React.SetStateAction<{
			login: number
			register: number
		}>
	) => void
	offsetHeight: number
	type: "login" | "register"
}) => void

export const useTabResize: UseTabResize = options => {
	useLayoutEffect(() => {
		options.setTabSizes(prev => ({
			...prev,
			[options.type]: options.offsetHeight
		}))
	}, [options.offsetHeight, options.errors])
}
