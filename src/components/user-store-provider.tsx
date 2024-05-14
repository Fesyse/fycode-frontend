"use client"

import { type ReactNode, type FC, createContext, useRef } from "react"
import { type StoreApi } from "zustand"

import { type UserStore, createUserStore } from "@/stores/user.store"

export const UserStoreContext = createContext<StoreApi<UserStore> | null>(null)

export interface UserStoreProviderProps {
	children: ReactNode
}

export const UserStoreProvider: FC<UserStoreProviderProps> = ({ children }) => {
	const storeRef = useRef<StoreApi<UserStore>>()
	if (!storeRef.current) {
		storeRef.current = createUserStore()
	}

	return (
		<UserStoreContext.Provider value={storeRef.current}>
			{children}
		</UserStoreContext.Provider>
	)
}
