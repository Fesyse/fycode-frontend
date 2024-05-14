import type { User } from "./user.type"

export interface AuthResponse {
	accessToken: string
	user: User
}

export interface LoginRequest {
	email: string
	password: string
}

export interface RegisterRequest extends LoginRequest {
	username: string
}

export interface RequestError {
	message: string
}
