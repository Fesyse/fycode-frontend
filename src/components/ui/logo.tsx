import { type FC } from "react"

export const Logo: FC<{ className?: string }> = ({ className }) => {
	return (
		<span className={className}>
			<span className="text-indigo-400">Fy</span>code
		</span>
	)
}
