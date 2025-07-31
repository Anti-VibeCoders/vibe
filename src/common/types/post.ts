export type Post = {
    id: number,
    user: string,
    avatarImage: string,
    date: string,
    image?: string,
    description: string,
    isVerified?: boolean
}