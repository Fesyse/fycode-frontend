import { useState } from "react"

export const useBodyScrollLock = () => {
	const [isBodyScrollLocked, setIsBodyScrollLocked] = useState<boolean>(false)

	const mutationObserver = new MutationObserver(() =>
		setIsBodyScrollLocked(
			!!document.querySelector("body[data-scroll-locked='1']")
		)
	)
	mutationObserver.observe(document.body, { attributes: true })
	return [isBodyScrollLocked, setIsBodyScrollLocked]
}
