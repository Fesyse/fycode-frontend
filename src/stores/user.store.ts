import type { User } from "@/types/user.type"
import { createStore } from "zustand/vanilla"

export type UserState = {
	user: User | undefined
}

export type UserActions = {
	setUser: (user: User | undefined) => void
	removeUser: () => void
	updateUser: (user: Partial<User>) => void
}

export type UserStore = UserState & UserActions

export const defaultInitState: UserState = { user: undefined }

export const createUserStore = (initState: UserState = defaultInitState) => {
	return createStore<UserStore>()(set => ({
		...initState,
		setUser: user => set({ user }),
		removeUser: () => set({ user: undefined }),
		updateUser: newUser =>
			set(state => ({ user: { ...state.user!, ...newUser } }))
	}))
}
