export type Post = {
    id: number,
    user: string,
    avatarImage: string,
    created_at: string,
    image?: string,
    content: string,
    isVerified?: boolean
}