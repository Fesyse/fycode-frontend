import type { Argument } from "@/types/test.type"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function randomInt(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

export function titleString(str: string) {
	return str[0]?.toUpperCase() + str.slice(1, str.length)
}

export function getDefaultArgumentValue(type: Argument["type"]) {
	switch (type) {
		case "number":
			return ""
		case "string":
			return ""
		case "number-array":
			return "[1, 2, 3]"
		case "string-array":
			return '["1", "2", "3"]'
	}
}

export function parseValue(value: string, type: Argument["type"]) {
	switch (type) {
		case "number":
			return Number(value)
		case "string":
			return value
		case "number-array":
			return JSON.parse(value) as number[]
		case "string-array":
			return JSON.parse(value) as string[]
	}
}

/*
 * Return the given number as a formatted string.  The default format is a plain
 * integer with thousands-separator commas.  The optional parameters facilitate
 * other formats:
 *   - decimals = the number of decimals places to round to and show
 *   - valueIfNaN = the value to show for non-numeric input
 *   - style
 *     - '%': multiplies by 100 and appends a percent symbol
 *     - '$': prepends a dollar sign
 *   - useOrderSuffix = whether to use suffixes like k for 1,000, etc.
 *   - orderSuffixes = the list of suffixes to use
 *   - minOrder and maxOrder allow the order to be constrained.  Examples:
 *     - minOrder = 1 means the k suffix should be used for numbers < 1,000
 *     - maxOrder = 1 means the k suffix should be used for numbers >= 1,000,000
 */
export function formatNumber(
	number: number,
	{
		decimals = 0,
		valueIfNaN = "",
		style = "",
		useOrderSuffix = false,
		orderSuffixes = ["", "k", "M", "B", "T"],
		minOrder = 0,
		maxOrder = Infinity
	} = {}
) {
	// @ts-expect-error converting number to float
	let x = parseFloat(number)

	if (isNaN(x)) return valueIfNaN

	if (style === "%") x *= 100.0

	let order
	if (!isFinite(x) || !useOrderSuffix) order = 0
	else if (minOrder === maxOrder) order = minOrder
	else {
		const unboundedOrder = Math.floor(Math.log10(Math.abs(x)) / 3)
		order = Math.max(
			0,
			minOrder,
			Math.min(unboundedOrder, maxOrder, orderSuffixes.length - 1)
		)
	}

	const orderSuffix = orderSuffixes[order]
	if (order !== 0) x /= Math.pow(10, order * 3)

	return (
		(style === "$" ? "$" : "") +
		x.toLocaleString("en-US", {
			style: "decimal",
			minimumFractionDigits: decimals,
			maximumFractionDigits: decimals
		}) +
		orderSuffix +
		(style === "%" ? "%" : "")
	)
}
