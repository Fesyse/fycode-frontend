import debounce from "lodash.debounce"
import { Plus, X } from "lucide-react"
import { type FC, useCallback, useEffect } from "react"
import { type Control, useFieldArray } from "react-hook-form"
import { toast } from "sonner"
import { type z } from "zod"
import { type CreateProblem, TestInputTypes } from "@/types/problem.type"
import { Button } from "@/components/shadcn/button"
import { FormField } from "@/components/shadcn/form"
import { Input } from "@/components/shadcn/input"
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/shadcn/select"
import { type createProblemSchema } from "@/lib/schemas"
import { titleString } from "@/lib/utils"
import { useCreateProblemStore } from "@/stores/problem/create-problem.store"
import { useUserStore } from "@/stores/user.store"

type ArgumentsFieldProps = {
	control: Control<z.infer<typeof createProblemSchema>>
}

export const ArgumentsField: FC<ArgumentsFieldProps> = ({ control }) => {
	const user = useUserStore(s => s.user)
	const { problem, updateProblem } = useCreateProblemStore()
	const { fields, append, remove } = useFieldArray({
		name: "functionArgs",
		control
	})
	const types = Object.values(TestInputTypes)

	const handleUpdateProblem = useCallback(
		debounce((problem: Partial<CreateProblem>) => {
			updateProblem(problem, user?.id)
		}, 350),
		[user]
	)

	const handleUpdateProblemField = (options: {
		index: number
		type: "name" | "type"
		value: string | TestInputTypes
	}) => {
		const newArguments = fields.map((fieldsWithId, index) => {
			const field = { ...fieldsWithId, id: undefined }
			if (options.index !== index) return field

			return { ...field, [options.type]: options.value }
		})

		updateProblem(
			{
				functionOptions: {
					args: newArguments,
					name: problem.functionOptions?.name ?? ""
				}
			},
			user?.id
		)
	}

	useEffect(() => {
		handleUpdateProblem({
			functionOptions: {
				args: fields,
				name: problem.functionOptions?.name ?? ""
			}
		})
	}, [fields, handleUpdateProblem])
	return (
		<ul className="grid gap-2">
			{fields.map((field, i) => (
				<li key={field.id} className="flex gap-2">
					<FormField
						render={({ field }) => (
							<Input
								{...field}
								maxLength={10}
								onChange={e => {
									handleUpdateProblemField({
										index: i,
										type: "name",
										value: e.target.value
									})
									field.onChange(e)
								}}
							/>
						)}
						name={`functionArgs.${i}.name`}
						control={control}
					/>
					<FormField
						control={control}
						name={`functionArgs.${i}.type`}
						render={({ field }) => (
							<Select
								onValueChange={(value: TestInputTypes) => {
									handleUpdateProblemField({
										index: i,
										type: "type",
										value
									})
									field.onChange(value)
								}}
								defaultValue={field.value}
							>
								<SelectTrigger>
									<SelectValue placeholder="Type" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										{types.map((type, i) => (
											<SelectItem key={i} value={type}>
												{titleString(type)}
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
						)}
					/>
					<Button
						type="button"
						onClick={() => (fields.length > 1 ? remove(i) : null)}
						className="w-10 h-10 p-2"
						variant="secondary"
					>
						<X strokeWidth={1.5} />
					</Button>
				</li>
			))}
			<Button
				type="button"
				className="w-full mt-2"
				variant="secondary"
				onClick={() => {
					if (fields.length > 3)
						return toast.error("Max amount of arguments reached - 4")
					append({
						name: "argument",
						type: TestInputTypes.string
					})
				}}
			>
				Add new argument <Plus />
			</Button>
		</ul>
	)
}
