import { axios, axiosWithAuth } from "@/api/interceptors"
import { type z } from "zod"
import { type updateUserFormSchema } from "@/lib/schemas"
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

	async update(data: z.infer<typeof updateUserFormSchema>) {
		const response = await axiosWithAuth.put<User>(
			`${this.BASE_URL}/update`,
			data
		)
		return response.data
	}

	async updateAvatar(formData: FormData) {
		const response = await axiosWithAuth.patch<User>(
			`${this.BASE_URL}/update-avatar`,
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data"
				}
			}
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
