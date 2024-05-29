import type { AuthResponse } from "@/types/auth.type"
import Cookies from "js-cookie"

export enum EnumTokens {
	"ACCESS_TOKEN" = "accessToken",
	"REFRESH_TOKEN" = "refreshToken"
}

export const getNewTokens = async () => {
	const options: RequestInit = {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		credentials: "include"
	}
	const response = await fetch(
		"http://localhost:4200/api/auth/login/access-token",
		options
	)
	const data = (await response.json()) as AuthResponse

	if (data) saveTokenStorage(data.accessToken)
	return data
}

export const getAccessToken = async () => {
	let accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN)
	if (!accessToken) accessToken = (await getNewTokens()).accessToken

	return accessToken ?? null
}

export const saveTokenStorage = (accessToken: string) => {
	Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
		domain: "localhost",
		sameSite: "strict",
		expires: 1
	})
}

export const removeFromStorage = () => {
	Cookies.remove(EnumTokens.ACCESS_TOKEN)
}
