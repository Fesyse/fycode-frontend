import { useState } from "react"

export const useWindowAtTop = () => {
	const [isAtTheTop, setIsAtTheTop] = useState<boolean>(true)

	if (typeof window !== "undefined") {
		window.addEventListener("scroll", () => {
			if (window.scrollY !== 0 && isAtTheTop) setIsAtTheTop(false)
			if (window.scrollY === 0 && !isAtTheTop) setIsAtTheTop(true)
		})
	}

	return [isAtTheTop, setIsAtTheTop]
}
