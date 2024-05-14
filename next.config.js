/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js")

/** @type {import("next").NextConfig} */
const config = {
	webpack: {
		// @ts-expect-error just fixes type error with webpack options
		experiments: {
			topLevelAwait: true
		}
	}
}

export default config
