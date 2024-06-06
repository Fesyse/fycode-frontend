import { revalidatePath } from "next/cache"
import { type NextRequest } from "next/server"

export const revalidate = true

export async function POST(request: NextRequest) {
	const path = request.nextUrl.searchParams.get("path")

	if (path) revalidatePath(path)

	return new Response()
}
