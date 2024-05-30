import { type NextRequest, NextResponse } from "next/server"
import { EnumTokens, getNewTokens } from "./services/auth-token.service"
import { cookies } from "next/headers"

export default async function middleware(request: NextRequest) {
	const headers = new Headers(request.headers)
	headers.set("x-current-path", request.nextUrl.pathname)

	const isAuthPage = request.nextUrl.pathname.startsWith("auth")
	if (isAuthPage) {
		let token = cookies().get(EnumTokens.ACCESS_TOKEN) as
			| undefined
			| {
					name: string
					value: string
			  }

		if (token?.value === "undefined" || !token?.value)
			token = {
				name: EnumTokens.ACCESS_TOKEN,
				value: (await getNewTokens()).accessToken
			}
		if (token?.value !== "undefined" && token?.value)
			return NextResponse.redirect(
				new URL("/dashboard/", request.nextUrl.origin),
				{ headers }
			)
	}

	return NextResponse.next({ headers })
}

export const config = {
	matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)"
}
