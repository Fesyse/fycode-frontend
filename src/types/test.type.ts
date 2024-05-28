export interface Test {
	input: ExtendedArgument[]
}

export interface Argument {
	name: string
	type: "number" | "string" | "number-array" | "string-array"
}

export interface ExtendedArgument extends Argument {
	value: string
}
