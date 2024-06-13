import { type FC } from "react"
import { type Control, useFieldArray } from "react-hook-form"
import { type z } from "zod"
import { type createProblemSchema } from "@/lib/schemas"

type ArgumentsFieldProps = {
	control: Control<z.infer<typeof createProblemSchema>>
}

export const ArgumentsField: FC<ArgumentsFieldProps> = ({ control }) => {
	const {} = useFieldArray({
		name: "functionArgs",
		control
	})
	return <div></div>
}
