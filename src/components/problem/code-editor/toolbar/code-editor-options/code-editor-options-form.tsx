import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { type z } from "zod"
import { Checkbox } from "@/components/shadcn/checkbox"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/shadcn/form"
import { Input } from "@/components/shadcn/input"
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/shadcn/select"
import { Separator } from "@/components/shadcn/separator"
import {
	cursorBlinkingEnum,
	cursorSmoothCaretAnimationEnum,
	cursorStyleEnum,
	editorOptionsSchema
} from "@/lib/schemas"
import { range } from "@/lib/utils"
import { useEditorOptionsStore } from "@/stores/problem/editor-options.store"
import { useUserStore } from "@/stores/user.store"

export const CodeEditorOptionsForm = () => {
	const { editorOptions, updateEditorOptions } = useEditorOptionsStore()
	const user = useUserStore(s => s.user)
	const form = useForm<z.infer<typeof editorOptionsSchema>>({
		resolver: zodResolver(editorOptionsSchema),
		reValidateMode: "onChange",
		defaultValues: editorOptions
	})

	const fontSizes = range(21, 12) // [12, 13..32]

	const onSubmit = (data: z.infer<typeof editorOptionsSchema>) => {
		updateEditorOptions(data, user?.id)
	}

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		const subscription = form.watch(() => form.handleSubmit(onSubmit)())
		return () => subscription.unsubscribe()
	}, [form.handleSubmit, form.watch])
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(console.log)} className="grid gap-4">
				<FormField
					control={form.control}
					name="tabSize"
					render={({ field }) => (
						<FormItem className="grid grid-cols-[5rem_1fr] items-center space-x-3 space-y-0 rounded-md">
							<FormControl>
								<Input type="number" className="max-w-10 h-8" {...field} />
							</FormControl>
							<FormOptionDescription
								label="Tab size"
								description="Number of spaces, including tabs."
							/>
							<FormMessage className="col-span-2" />
						</FormItem>
					)}
				/>
				<Separator />
				<FormField
					control={form.control}
					name="fontSize"
					render={({ field }) => (
						<FormItem className="grid grid-cols-[5rem_1fr] items-center space-x-3 space-y-0 rounded-md">
							<FormControl>
								<Select
									onValueChange={value => field.onChange(parseInt(value))}
									defaultValue={field.value?.toString()}
								>
									<SelectTrigger className="w-20 h-8">
										<SelectValue className="text-sm" placeholder="##px" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											{fontSizes.map(fontSize => (
												<SelectItem key={fontSize} value={fontSize.toString()}>
													{fontSize}px
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
							</FormControl>
							<FormOptionDescription
								label="Font size"
								description="Specifies the font size in pixels."
							/>
							<FormMessage className="col-span-2" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="cursorSmoothCaretAnimation"
					render={({ field }) => (
						<FormItem className="grid grid-cols-[5rem_1fr] items-center space-x-3 space-y-0 rounded-md [&_button_+_input]:ml-auto">
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<SelectTrigger className="w-20 h-8">
										<SelectValue className="text-sm" placeholder="..." />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											{cursorSmoothCaretAnimationEnum.map(value => (
												<SelectItem key={value} value={value}>
													{value}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
							</FormControl>
							<FormOptionDescription
								label="Cursor smooth caret animation"
								description="Controls whether smooth cursor animation should be enabled."
							/>
							<FormMessage className="col-span-2" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="cursorStyle"
					render={({ field }) => (
						<FormItem className="grid grid-cols-[5rem_1fr] items-center space-x-3 space-y-0 rounded-md [&_button_+_input]:ml-auto">
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<SelectTrigger className="w-20 h-8">
										<SelectValue className="text-sm" placeholder="..." />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											{cursorStyleEnum.map(value => (
												<SelectItem key={value} value={value}>
													{value}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
							</FormControl>
							<FormOptionDescription
								label="Cursor smooth caret animation"
								description="Controls whether smooth cursor animation should be enabled."
							/>
							<FormMessage className="col-span-2" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="cursorBlinking"
					render={({ field }) => (
						<FormItem className="grid grid-cols-[5rem_1fr] items-center space-x-3 space-y-0 rounded-md [&_button_+_input]:ml-auto">
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<SelectTrigger className="w-20 h-8">
										<SelectValue placeholder="..." />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											{cursorBlinkingEnum.map(value => (
												<SelectItem key={value} value={value}>
													{value}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
							</FormControl>
							<FormOptionDescription
								label="Cursor smooth caret animation"
								description="Controls whether smooth cursor animation should be enabled."
							/>
							<FormMessage className="col-span-2" />
						</FormItem>
					)}
				/>
				<Separator />
				<FormField
					control={form.control}
					name="minimap.enabled"
					render={({ field }) => (
						<FormItem className="grid grid-cols-[5rem_1fr] items-center space-x-3 space-y-0 rounded-md [&_button_+_input]:ml-auto">
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<FormOptionDescription
								label="Show minimap"
								description="If checked, minimap will be shown in the code editor at the
								scroll bar."
							/>
							<FormMessage className="col-span-2" />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	)
}

type FormOptionDescriptionProps = {
	label: React.ReactNode
	description: React.ReactNode
}

function FormOptionDescription({
	description,
	label
}: FormOptionDescriptionProps) {
	return (
		<div className="space-y-1 leading-none">
			<FormLabel>{label}</FormLabel>
			<FormDescription>{description}</FormDescription>
		</div>
	)
}
