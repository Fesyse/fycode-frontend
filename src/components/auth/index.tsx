"use client"
import { type FC, useState } from "react"
import { AnimatePresence } from "framer-motion"
import { Login } from "./login"
import { Register } from "./register"
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent
} from "@/components/shadcn/card"

export type FormsProps = {
	callbackUrl: string
	tabSizes: {
		login: number
		register: number
	}
	setTabSizes: React.Dispatch<
		React.SetStateAction<{
			login: number
			register: number
		}>
	>
	setCurrentTab: React.Dispatch<React.SetStateAction<"login" | "register">>
}

type AuthProps = {
	callbackUrl?: string
}

export const Auth: FC<AuthProps> = ({ callbackUrl }) => {
	const [currentTab, setCurrentTab] = useState<"login" | "register">("register")
	const [tabSizes, setTabSizes] = useState({
		login: 200,
		register: 300
	})

	const formsProps: FormsProps = {
		callbackUrl: callbackUrl ?? "/dashboard",
		setCurrentTab,
		tabSizes,
		setTabSizes
	}

	return (
		<Card className="w-[475px]">
			<CardHeader>
				<CardTitle>{currentTab === "login" ? "Login" : "Register"}</CardTitle>
				<CardDescription>
					{currentTab === "login"
						? "Login to your existing account."
						: "Create new account."}
				</CardDescription>
			</CardHeader>
			<CardContent className="overflow-hidden">
				<AnimatePresence>
					{currentTab === "login" ? (
						<Login {...formsProps} />
					) : (
						<Register {...formsProps} />
					)}
				</AnimatePresence>
			</CardContent>
		</Card>
	)
}
