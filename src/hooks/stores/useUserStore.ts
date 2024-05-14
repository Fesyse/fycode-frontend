import type { UserStore } from "@/stores/user.store"
import { UserStoreContext } from "@/components/user-store-provider"
import { useContext } from "react"
import { useStore } from "zustand"

export const useUserStore = <T>(selector: (store: UserStore) => T): T => {
	const userStoreContext = useContext(UserStoreContext)

	if (!userStoreContext) {
		throw new Error(`useUserStore must be use within UserStoreProvider`)
	}

	return useStore(userStoreContext, selector)
}
