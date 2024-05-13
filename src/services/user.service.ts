import { axiosWithAuth } from "@/api/interceptors"
import type { Profile, User } from "@/types/user.type"

class UserService {
	private BASE_URL = `/user`

	async get() {
		const response = await axiosWithAuth.get<User>(`${this.BASE_URL}`)
		return response.data
	}

	async getProfile() {
		const response = await axiosWithAuth.get<Profile>(
			`${this.BASE_URL}/profile`
		)
		return response.data
	}

	async update() {
		const response = await axiosWithAuth.put<User>(`${this.BASE_URL}/update`)
		return response.data
	}
}

export const userService = new UserService()
