export interface CustomTest {
	input: ExtendedArgument[]
}

export interface Argument {
	name: string
	type: unknown
}

export interface ExtendedArgument extends Argument {
	value: unknown
}
