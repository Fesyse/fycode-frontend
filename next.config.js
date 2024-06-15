import { env } from "./src/env.js"

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js")

/** @type {import("next/dist/shared/lib/image-config.js").RemotePattern} */
const serverAvatarsUrl = {
	// @ts-expect-error ts thinks env.NEXT_PUBLIC_SERVER_URL.split("://")[0] can be undefined
	protocol: env.NEXT_PUBLIC_SERVER_URL.split("://")[0],
	// @ts-expect-error ts thinks env.NEXT_PUBLIC_SERVER_URL.split("://")[1] can be undefined
	hostname: env.NEXT_PUBLIC_SERVER_URL.split("://")[1].split(
		env.NODE_ENV === "development" ? ":" : "/"
	)[0],
	port:
		env.NODE_ENV === "development"
			? // @ts-expect-error ts thinks env.NEXT_PUBLIC_SERVER_URL.split("://")[1] can be undefined
				env.NEXT_PUBLIC_SERVER_URL.split("://")[1].split(":")[1]?.split("/")[0]
			: undefined,
	pathname: "/api/user/avatar/**"
}

/** @type {import("next").NextConfig} */
const config = {
	images: {
		remotePatterns: [serverAvatarsUrl]
	}
}

export default config
