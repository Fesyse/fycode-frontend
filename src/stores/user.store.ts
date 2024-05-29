import type { User } from "@/types/user.type"
import { create } from "zustand"

export type UserState = {
	user: User | undefined
}

export type UserActions = {
	setUser: (user: User | undefined) => void
	removeUser: () => void
	updateUser: (user: Partial<User>) => void
}

export type UserStore = UserState & UserActions

export const useUserStore = create<UserStore>(set => ({
	user: undefined,
	setUser: user => set({ user }),
	removeUser: () => set({ user: undefined }),
	updateUser: newUser =>
		set(state => ({ user: { ...state.user!, ...newUser } }))
}))
