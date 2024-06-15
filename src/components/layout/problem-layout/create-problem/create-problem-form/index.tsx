import { zodResolver } from "@hookform/resolvers/zod"
import { Boxes } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { type z } from "zod"
import { type CreateProblem, TestInputTypes } from "@/types/problem.type"
import { useCreateProblem } from "@/hooks/problem/useCreateProblem"
import { Button } from "@/components/shadcn/button"
import { Checkbox } from "@/components/shadcn/checkbox"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/shadcn/form"
import { Input } from "@/components/shadcn/input"
import { Label } from "@/components/shadcn/label"
import { CustomTestsInfo } from "../custom-tests-info"
import { ArgumentsField } from "./arguments-field"
import { createProblemSchema } from "@/lib/schemas"
import { useCreateProblemStore } from "@/stores/problem/create-problem.store"
import { useUserStore } from "@/stores/user.store"

export const CreateProblemForm = () => {
	const { mutate: createProblem } = useCreateProblem()
	const problem = useCreateProblemStore(s => s.problem)
	const user = useUserStore(s => s.user)
	const form = useForm<z.infer<typeof createProblemSchema>>({
		resolver: zodResolver(createProblemSchema),
		mode: "onSubmit",
		defaultValues: {
			functionArgs: problem.functionOptions?.args ?? [
				{ name: "argument", type: TestInputTypes.string }
			],
			useCustomTests: problem.testsOptions?.useCustomTests ?? false,
			totalChecks: 100
		}
	})

	const isTotalChecksFieldDisabled = form.watch("useCustomTests")

	const handleCreateProblem = (data: z.infer<typeof createProblemSchema>) => {
		if (!user) return toast.error("You must be authorized to create problem.")

		const keysOfProblem = Object.keys(problem) as (keyof CreateProblem)[]
		for (const key of keysOfProblem) {
			if (key === "testsOptions" || key === "functionOptions" || key === "tags")
				continue
			const value = problem[key]!

			// there we check if all fields are provided
			const isAllFieldsProvided = !value.length || !value
			if (isAllFieldsProvided)
				return toast.error(
					`You have ${key} field missing, go back and provide it in order to create problem.`
				)
		}

		const newProblem = {
			...problem,
			testsOptions: {
				useCustomTests: data.useCustomTests,
				totalChecks: data.totalChecks
			},
			functionOptions: {
				args: data.functionArgs,
				name: problem.functionOptions?.name
			}
		} as CreateProblem
		localStorage.setItem(
			`create-problem-${user.id}`,
			JSON.stringify(newProblem)
		)
		createProblem(newProblem)
	}

	return (
		<Form {...form}>
			<form
				className="flex flex-col gap-4"
				onSubmit={form.handleSubmit(handleCreateProblem)}
			>
				<FormField
					control={form.control}
					name="useCustomTests"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<div className="flex items-center gap-2">
									<Checkbox
										id="use-custom-tests"
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
									<Label
										className="flex items-end gap-1"
										htmlFor="use-custom-tests"
									>
										Use your custom tests? <CustomTestsInfo />
									</Label>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="totalChecks"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Total checks</FormLabel>
							<FormControl>
								<Input
									type="number"
									placeholder="100"
									disabled={isTotalChecksFieldDisabled}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex flex-col gap-2">
					<FormLabel>Function arguments</FormLabel>
					<ArgumentsField control={form.control} />
				</div>
				<Button className="gap-2 mt-2" type="submit">
					Create <Boxes strokeWidth={1.5} />
				</Button>
			</form>
		</Form>
	)
}
