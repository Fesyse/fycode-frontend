/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
	semi: false,
	trailingComma: "none",
	tabWidth: 2,
	useTabs: true,
	singleQuote: false,
	arrowParens: "avoid",
	importOrder: [
		"<THIRD_PARTY_MODULES>",
		"^@/components/(.*)$",
		"^@/layout/(.*)$",
		"^@/ui/(.*)$",
		"^@/providers/(.*)$",
		"^@/constants/(.*)$",
		"^@/types/(.*)$",
		"^@/assets/(.*)$",
		"^@/config/(.*)$",
		"^@/store/(.*)$",
		"^@/hooks/(.*)$",
		"^@/utils/(.*)$",
		"^@/api/(.*)$",
		"^../(.*)",
		"^./(.*)",
		"(.scss)$"
	],
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
	plugins: [
		"prettier-plugin-tailwindcss",
		"@trivago/prettier-plugin-sort-imports"
	]
}

export default config
