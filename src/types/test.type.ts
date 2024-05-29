/* eslint-disable @typescript-eslint/no-explicit-any */
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

export interface Results {
	tests: {
		input: any[]
		expected: any
		output: any
	}[]
	success: boolean
	testsStatus: {
		declined: number
		passed: number
	}
}
