import { axios, axiosWithAuth } from "@/api/interceptors"
import type { ProblemsCount, Profile, User } from "@/types/user.type"

class UserService {
	private BASE_URL = `/user`

	async get() {
		const response = await axiosWithAuth.get<User>(`${this.BASE_URL}`)
		return response.data
	}

	async getProfile(userId: string) {
		const response = await axios.get<Profile>(
			`${this.BASE_URL}/profile/${userId}`
		)
		return response.data
	}

	async getProblemsCount(userId: string) {
		const response = await axios.get<ProblemsCount>(
			`${this.BASE_URL}/problems-count/${userId}`
		)
		return response.data
	}

	async update() {
		const response = await axiosWithAuth.put<User>(`${this.BASE_URL}/update`)
		return response.data
	}

	async updateAvatar(formData: FormData) {
		const response = await axiosWithAuth.patch<User>(
			`${this.BASE_URL}/update-avatar`,
			formData
		)
		return response.data
	}
	async removeAvatar() {
		const response = await axiosWithAuth.delete<User>(
			`${this.BASE_URL}/remove-avatar`
		)
		return response.data
	}
}

export const userService = new UserService()
