import { zodResolver } from "@hookform/resolvers/zod"
import { Boxes } from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"
import { toast } from "sonner"
import { type z } from "zod"
import { TestInputTypes } from "@/types/problem.type"
import { Button } from "@/components/shadcn/button"
import { Checkbox } from "@/components/shadcn/checkbox"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from "@/components/shadcn/form"
import { Label } from "@/components/shadcn/label"
import { CustomTestsInfo } from "./custom-tests-info"
import { createProblemSchema } from "@/lib/schemas"
import { useCreateProblemStore } from "@/stores/problem/create-problem.store"
import { useUserStore } from "@/stores/user.store"

export const CreateProblemForm = () => {
	const problem = useCreateProblemStore(s => s.problem)
	const user = useUserStore(s => s.user)
	const form = useForm<z.infer<typeof createProblemSchema>>({
		resolver: zodResolver(createProblemSchema),
		mode: "onSubmit",
		defaultValues: {
			functionArgs: [{ name: "Argument1", type: TestInputTypes.string }],
			useCustomTests: false,
			tests: undefined,
			totalChecks: 100
		}
	})
	const { append } = useFieldArray({
		control: form.control,
		name: "functionArgs"
	})

	const handleCreateProblem = (data: z.infer<typeof createProblemSchema>) => {
		if (!user) return toast.error("You must be authorized to create problem.")

		const keysOfProblem = Object.keys(problem)
		for (const key of keysOfProblem) {
			if (key === "testsOptions" || key === "functionOptions" || key === "tags")
				continue
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const value = problem[key]

			// there we check if all fields are provided
			console.log(problem)
			if (typeof value !== "boolean" && !value)
				return toast.error(
					`You have ${key === "useCustomTests" ? "use custom tests" : key} field missing, go back and provide it in order to create problem.`
				)
		}

		localStorage.setItem(
			`create-problem-${user.id}`,
			JSON.stringify({ ...problem, ...data })
		)
		// TODO: create problem via api
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleCreateProblem)}>
				<FormField
					control={form.control}
					name="useCustomTests"
					render={() => (
						<FormItem>
							<FormControl>
								<div className="flex items-center gap-2">
									<Checkbox id="use-custom-tests" />
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
				<Button className="gap-2 mt-6" type="submit">
					Create <Boxes strokeWidth={1.5} />
				</Button>
			</form>
		</Form>
	)
}
