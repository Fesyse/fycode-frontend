import { env } from "@/env"
import { generateUploadButton } from "@uploadthing/react"

export const UploadButton = generateUploadButton({
	url: env.NEXT_PUBLIC_UPLOAD_AVATAR_URL
})
