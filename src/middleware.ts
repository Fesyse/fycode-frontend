import { type NextRequest, NextResponse } from "next/server"
import { EnumTokens, getNewTokens } from "./services/auth-token.service"
import { cookies } from "next/headers"

export default async function middleware(request: NextRequest) {
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
		return NextResponse.redirect(new URL("/dashboard/", request.nextUrl.origin))
	return NextResponse.next()
}

export const config = {
	matcher: "/auth/:path*"
}
