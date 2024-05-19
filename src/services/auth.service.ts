import { axios } from "@/api/interceptors"
import type {
	AuthResponse,
	LoginRequest,
	RegisterRequest
} from "@/types/auth.type"
import { removeFromStorage } from "./auth-token.service"

class AuthService {
	private BASE_URL = `/auth`
	async login(data: LoginRequest) {
		const response = await axios.post<AuthResponse>(
			`${this.BASE_URL}/login`,
			data
		)
		return response.data
	}
	async register(data: RegisterRequest) {
		const response = await axios.post<AuthResponse>(
			`${this.BASE_URL}/register`,
			data
		)
		return response.data
	}
	async logout() {
		const response = await axios.post<true>(`${this.BASE_URL}/logout`)

		if (response.data) removeFromStorage()

		return response.data
	}
}

export const authService = new AuthService()
