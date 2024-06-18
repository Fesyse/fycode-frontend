import { zodResolver } from "@hookform/resolvers/zod"
import { Boxes } from "lucide-react"
import { useEffect } from "react"
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
import { parseValue } from "@/lib/utils"
import { useCreateProblemStore } from "@/stores/problem/create-problem.store"
import { useUserStore } from "@/stores/user.store"

export const CreateProblemForm = () => {
	const { mutate: createProblem } = useCreateProblem()
	const { problem, getProblem } = useCreateProblemStore()
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

		// there we check if there atleast 3 tests
		if (
			data.useCustomTests &&
			(!problem.testsOptions?.tests || problem.testsOptions?.tests?.length < 3)
		)
			return toast.error(
				"If you are using custom tests, you must provide 3 at minimum."
			)
		// there we check if tests amount arguments equals to provided function arguments
		if (
			!problem.testsOptions!.tests!.every(
				test => test.input.length === data.functionArgs.length
			)
		)
			return toast.error(
				`Every of your tests must contain at max/min ${data.functionArgs.length} arguments.`
			)

		let tests
		try {
			tests = problem.testsOptions!.tests!.map(test => ({
				input: test.input.map((arg, i) =>
					parseValue(arg as string, data.functionArgs[i]!.type)
				)
			}))
		} catch {
			return toast.error(
				"An error occured parsing custom tests, make sure you provided arguments with no errors.",
				{
					descriptionClassName: "text-foreground/50",
					description: 'type = String Array, argument = ["a","b","c"]'
				}
			)
		}

		const newProblem = {
			...problem,
			testsOptions: {
				tests,
				useCustomTests: data.useCustomTests,
				totalChecks: data.totalChecks
			},
			functionOptions: {
				args: data.functionArgs,
				name: problem.functionOptions?.name
			}
		} as CreateProblem
		localStorage.removeItem(`create-problem-${user.id}`)
		createProblem(newProblem)
	}

	useEffect(() => {
		const problem = getProblem(user?.id)
		form.reset({
			functionArgs: problem.functionOptions?.args ?? [
				{ name: "argument", type: TestInputTypes.string }
			],
			useCustomTests: problem.testsOptions?.useCustomTests ?? false,
			totalChecks: 100
		})
	}, [user])

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
