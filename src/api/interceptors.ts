/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import _axios, { type CreateAxiosDefaults } from "axios"

import { errorCatch } from "./error"
import {
	getAccessToken,
	getNewTokens,
	removeFromStorage
} from "@/services/auth-token.service"
import { env } from "@/env"

const options: CreateAxiosDefaults = {
	baseURL: env.NEXT_PUBLIC_SERVER_URL,
	headers: {
		"Content-Type": "application/json"
	},
	withCredentials: true
}

const axios = _axios.create(options)
const axiosWithAuth = _axios.create(options)

axiosWithAuth.interceptors.request.use(config => {
	const accessToken = getAccessToken()

	if (config?.headers && accessToken)
		config.headers.Authorization = `Bearer ${accessToken}`

	return config
})

axiosWithAuth.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config

		if (
			(error?.response?.status === 401 ||
				errorCatch(error) === "jwt expired" ||
				errorCatch(error) === "jwt must be provided") &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				await getNewTokens()
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				return axiosWithAuth.request(originalRequest)
			} catch (error) {
				if (errorCatch(error) === "jwt expired") removeFromStorage()
			}
		}

		throw error
	}
)

export { axios, axiosWithAuth }
